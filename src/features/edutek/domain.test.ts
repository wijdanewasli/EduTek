import { describe,it,expect } from 'vitest';
import { canAccess,isLate,weightedAverage,quizScore,authenticate,documentTypes } from './domain';
describe('Specification rules',()=>{
 it('keeps account administration exclusive to administrators',()=>{expect(canAccess('etudiant','utilisateurs')).toBe(false);expect(canAccess('enseignant','utilisateurs')).toBe(false);expect(canAccess('admin','utilisateurs')).toBe(true)});
 it('does not expose teacher class management to students',()=>expect(canAccess('etudiant','classes')).toBe(false));
 it('uses coefficients for automatic grade averages',()=>expect(weightedAverage([{score:10,coefficient:1},{score:20,coefficient:3}])).toBe(17.5));
 it('marks submissions after the deadline late',()=>{expect(isLate('2026-10-10T00:00','2026-10-09T23:59')).toBe(true);expect(isLate('2026-10-09T23:59','2026-10-09T23:59')).toBe(false)});
 it('automatically corrects quiz answers on a scale of 20',()=>expect(quizScore(['Une pile','Faux','algorithme'],['Une pile','Vrai','algorithme'])).toBe(13.33));
});
describe('Role-based sign-in and school services',()=>{
 it('signs in a demo account only into its own role',()=>{expect(authenticate('sarah.benali@edutek.example','etudiant2026','etudiant')).toHaveProperty('user');expect(authenticate('sarah.benali@edutek.example','etudiant2026','admin')).toHaveProperty('error');expect(authenticate('sarah.benali@edutek.example','wrong','etudiant')).toHaveProperty('error')});
 it('lets students and admins use scolarité and certifications but not teachers',()=>{expect(canAccess('etudiant','scolarite')).toBe(true);expect(canAccess('admin','certificats')).toBe(true);expect(canAccess('enseignant','scolarite')).toBe(false)});
 it('offers the ten requested document types',()=>expect(documentTypes).toHaveLength(10));
 it('opens internships to every role',()=>{for(const r of ['etudiant','enseignant','admin'] as const)expect(canAccess(r,'stages')).toBe(true)});
});
