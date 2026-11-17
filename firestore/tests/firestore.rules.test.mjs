import { readFileSync } from 'node:fs';
import { before, after, test } from 'node:test';
import assert from 'node:assert/strict';

import {
  initializeTestEnvironment,
  assertSucceeds,
  assertFails
} from '@firebase/rules-unit-testing';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

let testEnv;

before(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'cronogel-rules-test',
    firestore: {
      rules: readFileSync('firestore.rules', 'utf8')
    }
  });

  await testEnv.withSecurityRulesDisabled(async (context) => {
    const db = context.firestore();

    for (const [uid, role, active] of [
      ['owner-test', 'owner', true],
      ['editor-test', 'editor', true],
      ['viewer-test', 'viewer', true],
      ['inactive-test', 'editor', false]
    ]) {
      await setDoc(doc(db, `members/${uid}`), {
        active,
        role
      });
    }

    await setDoc(doc(db, 'events/existing-event'), {
      title: 'Evento inicial'
    });

    await setDoc(doc(db, 'milestones/existing-milestone'), {
      title: 'Hito inicial'
    });
  });
});

after(async () => {
  if (testEnv) await testEnv.cleanup();
});

function userDb(uid, emailVerified = true) {
  return testEnv.authenticatedContext(uid, {
    email_verified: emailVerified
  }).firestore();
}

async function verifyCrud(db, collectionName, id) {
  const reference = doc(db, `${collectionName}/${id}`);

  await assertSucceeds(
    setDoc(reference, { title: 'Creado' })
  );

  await assertSucceeds(
    updateDoc(reference, { title: 'Modificado' })
  );

  await assertSucceeds(deleteDoc(reference));
}

test('Owner: lectura y CRUD completo de eventos e hitos', async () => {
  const db = userDb('owner-test');

  await assertSucceeds(getDocs(collection(db, 'events')));
  await assertSucceeds(getDocs(collection(db, 'milestones')));

  await verifyCrud(db, 'events', 'owner-event');
  await verifyCrud(db, 'milestones', 'owner-milestone');
});

test('Editor: lectura y CRUD completo de eventos e hitos', async () => {
  const db = userDb('editor-test');

  await assertSucceeds(getDocs(collection(db, 'events')));
  await assertSucceeds(getDocs(collection(db, 'milestones')));

  await verifyCrud(db, 'events', 'editor-event');
  await verifyCrud(db, 'milestones', 'editor-milestone');
});

test('Viewer: puede leer, pero no crear, modificar ni eliminar', async () => {
  const db = userDb('viewer-test');

  await assertSucceeds(getDocs(collection(db, 'events')));
  await assertSucceeds(getDocs(collection(db, 'milestones')));

  await assertFails(
    setDoc(doc(db, 'events/viewer-event'), { title: 'No permitido' })
  );

  await assertFails(
    updateDoc(doc(db, 'events/existing-event'), { title: 'No permitido' })
  );

  await assertFails(
    deleteDoc(doc(db, 'events/existing-event'))
  );

  await assertFails(
    setDoc(doc(db, 'milestones/viewer-milestone'), { title: 'No permitido' })
  );

  await assertFails(
    updateDoc(doc(db, 'milestones/existing-milestone'), { title: 'No permitido' })
  );

  await assertFails(
    deleteDoc(doc(db, 'milestones/existing-milestone'))
  );
});

test('Owner: puede listar y gestionar miembros', async () => {
  const db = userDb('owner-test');

  await assertSucceeds(getDocs(collection(db, 'members')));

  const newMember = doc(db, 'members/managed-test');

  await assertSucceeds(
    setDoc(newMember, { active: true, role: 'viewer' })
  );

  await assertSucceeds(
    updateDoc(newMember, { role: 'editor' })
  );

  await assertSucceeds(deleteDoc(newMember));
});

test('Editor: solo puede consultar su propio perfil', async () => {
  const db = userDb('editor-test');

  await assertSucceeds(
    getDoc(doc(db, 'members/editor-test'))
  );

  await assertFails(
    getDoc(doc(db, 'members/viewer-test'))
  );

  await assertFails(
    getDocs(collection(db, 'members'))
  );

  await assertFails(
    setDoc(doc(db, 'members/new-member'), {
      active: true,
      role: 'viewer'
    })
  );

  await assertFails(
    updateDoc(doc(db, 'members/viewer-test'), {
      role: 'editor'
    })
  );

  await assertFails(
    deleteDoc(doc(db, 'members/viewer-test'))
  );
});

test('Viewer: solo puede consultar su propio perfil', async () => {
  const db = userDb('viewer-test');

  await assertSucceeds(
    getDoc(doc(db, 'members/viewer-test'))
  );

  await assertFails(
    getDoc(doc(db, 'members/editor-test'))
  );

  await assertFails(
    getDocs(collection(db, 'members'))
  );
});

test('Usuario con correo no verificado: no puede leer datos', async () => {
  const db = userDb('owner-test', false);

  await assertFails(getDocs(collection(db, 'events')));
  await assertFails(getDocs(collection(db, 'milestones')));
  await assertFails(getDoc(doc(db, 'members/owner-test')));
});

test('Miembro inactivo: no puede acceder a eventos ni hitos', async () => {
  const db = userDb('inactive-test');

  await assertFails(getDocs(collection(db, 'events')));
  await assertFails(getDocs(collection(db, 'milestones')));

  await assertFails(
    setDoc(doc(db, 'events/inactive-event'), { title: 'No permitido' })
  );
});

test('Usuario sin membresía: no puede acceder a datos', async () => {
  const db = userDb('unknown-test');

  await assertFails(getDocs(collection(db, 'events')));
  await assertFails(getDocs(collection(db, 'milestones')));

  await assertFails(
    setDoc(doc(db, 'events/unknown-event'), { title: 'No permitido' })
  );
});
