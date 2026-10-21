export type Role = 'enseignant' | 'etudiant' | 'admin';
export type AttendanceStatus = 'Présent' | 'Absent' | 'Retard' | 'Justifié';
export const roles: Role[] = ['enseignant', 'etudiant', 'admin'];
export const roleNames = { enseignant: 'Enseignant', etudiant: 'Étudiant', admin: 'Administrateur' };
export const sectionTitles = { cours: 'Mes cours', classes: 'Classes', devoirs: 'Devoirs', quiz: 'Quiz & examens', presences: 'Présences & absences', notes: 'Notes & résultats', planning: 'Emploi du temps', annonces: 'Annonces', messages: 'Messages', ressources: 'Ressources', parametres: 'Paramètres', utilisateurs: 'Utilisateurs', organisation: 'Organisation', scolarite: 'Scolarité & documents', certificats: 'Certifications', stages: 'Stages & soutenances', statistiques: 'Statistiques', assistant: 'Assistant IA' };
export type Section = keyof typeof sectionTitles;
export function isRole(value: string): value is Role { return roles.some(r => r === value); }
export function canAccess(role: Role, section: Section) {
  if (section === 'parametres' || section === 'annonces' || section === 'messages') return true;
  if (role === 'admin') return ['utilisateurs','organisation','classes','scolarite','certificats','stages','statistiques'].includes(section);
  if (['utilisateurs','organisation'].includes(section)) return false;
  if (role === 'etudiant' && ['classes','statistiques'].includes(section)) return false;
  if (role === 'enseignant' && ['scolarite','certificats'].includes(section)) return false;
  return true;
}
export function weightedAverage(grades: { score: number; coefficient: number }[]) {
 const weight = grades.reduce((n,g) => n + g.coefficient,0);
 return weight ? Math.round(grades.reduce((n,g) => n + g.score*g.coefficient,0)/weight*100)/100 : 0;
}
export function isLate(submittedAt: string, deadline: string) { return new Date(submittedAt).getTime() > new Date(deadline).getTime(); }
export function quizScore(answers: string[], correct: string[]) { return correct.length ? Math.round(correct.reduce((n,a,i) => n + (answers[i]?.trim().toLowerCase() === a.trim().toLowerCase() ? 1 : 0),0)/correct.length*20*100)/100 : 0; }
export function pageHead(title: string) { const full = `${title} | EduTek`; const description = `${title} — votre espace pédagogique EduTek pour les cours, le suivi scolaire et la communication.`; return { meta: [{title:full},{name:'description',content:description},{property:'og:title',content:full},{property:'og:description',content:description},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}] }; }
export const phaseTwo = ['statistiques','assistant'];
export const documentTypes = ["Attestation d'inscription Anglais","Attestation d'inscription Arabe","Attestation d'inscription Français","Attestation de diplôme","Attestation de paiement Anglais","Attestation de paiement Français","Attestation de présence Anglais","Attestation de présence Arabe","Attestation de présence Français","Attestation de réussite"] as const;
export type RequestStatus = 'En attente' | 'En cours' | 'Validée' | 'Refusée';
export const demoAccounts = [
 {email:'amine.mansour@edutek.example',password:'enseignant2026',role:'enseignant' as Role,name:'Amine Mansour'},
 {email:'sarah.benali@edutek.example',password:'etudiant2026',role:'etudiant' as Role,name:'Sarah Ben Ali'},
 {email:'nour.haddad@edutek.example',password:'admin2026',role:'admin' as Role,name:'Nour Haddad'},
];
export function authenticate(email: string, password: string, role: Role) { const a = demoAccounts.find(a => a.email === email.trim().toLowerCase() && a.password === password); if (!a) return { error: 'Adresse e-mail ou mot de passe incorrect.' }; if (a.role !== role) return { error: `Ce compte n’a pas accès à l’espace ${roleNames[role]}.` }; return { user: { email: a.email, role: a.role, name: a.name } }; }
