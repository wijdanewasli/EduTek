import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import algorithmImage from '@/assets/algorithmique.jpg';
import databaseImage from '@/assets/database.jpg';
import webImage from '@/assets/web.jpg';
import type { AttendanceStatus, Role, RequestStatus } from './domain';
export type SessionUser = { email: string; role: Role; name: string };
export type DocRequest = { id: string; student: string; type: string; copies: number; reason: string; date: string; status: RequestStatus; response?: string };
export type CertRequest = { id: string; student: string; certificate: string; motivation: string; date: string; status: RequestStatus; process?: string; examDate?: string; room?: string };
export type Internship = { id: string; student: string; company: string; subject: string; supervisor: string; start: string; end: string; report?: string; reportDate?: string; reportStatus: 'Non déposé' | 'Déposé' | 'Validé' | 'À corriger'; feedback?: string; defenseDate?: string; defenseRoom?: string; jury?: string; defenseGrade?: number };
export type Course = { id: string; title: string; category: string; group: string; image: string; chapters: string[]; published: boolean; students: number; progress: number };
export type Assignment = { id: string; title: string; course: string; deadline: string; submitted: number; total: number; file?: string; attachment?: string; score?: number; comment?: string; submittedAt?: string };
export type Announcement = { id: string; title: string; body: string; group: string; date: string; attachment?: string };
export type Person = { id: string; name: string; email: string; role: Role; group: string; active: boolean };
export const initialCourses: Course[] = [
 {id:'algo',title:'Algorithmique & structures de données',category:'INFORMATIQUE',group:'L2 Informatique · Groupe A',image:algorithmImage,chapters:['Introduction aux algorithmes','Complexité et notation asymptotique','Les structures de données','Arbres et parcours'],published:true,students:24,progress:75},
 {id:'bdd',title:'Bases de données relationnelles',category:'INFORMATIQUE',group:'L2 Informatique · Groupe B',image:databaseImage,chapters:['Le modèle relationnel','Conception et normalisation','Requêtes SQL'],published:true,students:26,progress:60},
 {id:'web',title:'Développement web moderne',category:'DÉVELOPPEMENT',group:'L1 Informatique · Groupe A',image:webImage,chapters:['Les fondamentaux HTML','Mise en page CSS','JavaScript et le DOM'],published:false,students:30,progress:35},
];
export const initialPeople: Person[] = [
 {id:'s1',name:'Sarah Ben Ali',email:'sarah.benali@edutek.example',role:'etudiant',group:'L2 Informatique · Groupe A',active:true},
 {id:'s2',name:'Youssef Trabelsi',email:'youssef.trabelsi@edutek.example',role:'etudiant',group:'L2 Informatique · Groupe A',active:true},
 {id:'s3',name:'Meriem Khaled',email:'meriem.khaled@edutek.example',role:'etudiant',group:'L2 Informatique · Groupe B',active:true},
 {id:'s4',name:'Rayen Rezgui',email:'rayen.rezgui@edutek.example',role:'etudiant',group:'L1 Informatique · Groupe A',active:true},
 {id:'t1',name:'Amine Mansour',email:'amine.mansour@edutek.example',role:'enseignant',group:'Informatique',active:true},
 {id:'t2',name:'Nour Haddad',email:'nour.haddad@edutek.example',role:'enseignant',group:'Mathématiques',active:true},
];
export const initialAssignments: Assignment[] = [
 {id:'a1',title:'Structures de données : listes & piles',course:'Algorithmique',deadline:'2026-10-09T23:59',submitted:18,total:24},
 {id:'a2',title:'Conception d’un modèle relationnel',course:'Bases de données',deadline:'2026-10-12T23:59',submitted:21,total:26},
 {id:'a3',title:'Créer une page web accessible',course:'Développement web',deadline:'2026-10-15T23:59',submitted:12,total:30,score:16,comment:'Très bon travail. Pensez aux attributs accessibles.',file:'page-web.zip',submittedAt:'2026-10-06T14:00'},
];
export const sessions = [
 {day:2,time:'09:00',end:'10:30',title:'Algorithmique',group:'L2 · Groupe A',room:'B12',tone:'dark'},
 {day:2,time:'11:00',end:'12:30',title:'Bases de données',group:'L2 · Groupe B',room:'Lab 02',tone:'secondary'},
 {day:2,time:'14:30',end:'16:00',title:'Développement web',group:'L1 · Groupe A',room:'A08',tone:'light'},
 {day:2,time:'16:30',end:'17:30',title:'Travaux dirigés',group:'L2 · Groupe A',room:'B12',tone:'light'},
 {day:0,time:'09:00',end:'10:30',title:'Algorithmique',group:'L2 · Groupe A',room:'B12',tone:'secondary'},
 {day:1,time:'11:00',end:'12:30',title:'Bases de données',group:'L2 · Groupe B',room:'Lab 02',tone:'secondary'},
 {day:3,time:'09:00',end:'10:30',title:'Développement web',group:'L1 · Groupe A',room:'A08',tone:'secondary'},
 {day:4,time:'14:30',end:'16:00',title:'Algorithmique',group:'L2 · Groupe A',room:'B12',tone:'secondary'},
];
export type Quiz = { id:string; title:string; course:string; minutes:number; date:string; published:boolean; questions:{text:string;options:string[];correct:string;type:'QCM'|'Vrai/Faux'|'Réponse courte'}[] };
export const initialQuizzes: Quiz[] = [{id:'q1',title:'Les fondamentaux de l’algorithmique',course:'Algorithmique',minutes:15,date:'2026-10-08T10:00',published:true,questions:[{text:'Quelle structure suit le principe LIFO ?',options:['Une file','Une pile','Un arbre'],correct:'Une pile',type:'QCM'},{text:'Une recherche binaire nécessite un tableau trié.',options:['Vrai','Faux'],correct:'Vrai',type:'Vrai/Faux'},{text:'Quel mot désigne un ensemble fini d’instructions pour résoudre un problème ?',options:[],correct:'algorithme',type:'Réponse courte'}]},{id:'q2',title:'Introduction au modèle relationnel',course:'Bases de données',minutes:20,date:'2026-10-13T11:00',published:false,questions:[{text:'SQL signifie Structured Query Language.',options:['Vrai','Faux'],correct:'Vrai',type:'Vrai/Faux'}]}];
function useSampleState() {
 const [role,setRole] = useState<Role>('enseignant');
 const [courses,setCourses] = useState(initialCourses);
 const [assignments,setAssignments] = useState(initialAssignments);
 const [people,setPeople] = useState(initialPeople);
 const [quizzes,setQuizzes] = useState(initialQuizzes);
 const [attendance,setAttendance] = useState<Record<string,AttendanceStatus>>({s1:'Présent',s2:'Présent',s3:'Retard',s4:'Absent'});
 const [attendanceHistory,setAttendanceHistory] = useState<{date:string;session:string;values:Record<string,AttendanceStatus>}[]>([]);
 const [grades,setGrades] = useState([{subject:'Algorithmique',score:15.5,coefficient:3},{subject:'Bases de données',score:16,coefficient:2},{subject:'Développement web',score:14,coefficient:2}]);
 const [announcements,setAnnouncements] = useState<Announcement[]>([{id:'n1',title:'Réunion pédagogique',body:'La réunion pédagogique du semestre aura lieu jeudi à 16h00 dans la salle des conseils.',group:'Tous',date:'2026-10-07T08:00'},{id:'n2',title:'Supports de cours disponibles',body:'Les supports du chapitre 3 et les exercices sur les structures de données sont maintenant disponibles.',group:'L2 Informatique · Groupe A',date:'2026-10-06T14:30'}]);
 const [messages,setMessages] = useState<Record<string,{text:string;mine:boolean}[]>>({Sarah:[{text:'Bonjour professeur, pourriez-vous préciser les consignes du devoir sur les piles ?',mine:false},{text:'Bonjour Sarah, les exercices 1 à 3 sont à réaliser. Le support du chapitre 3 est disponible.',mine:true}],Youssef:[{text:'Merci pour le cours de ce matin !',mine:false}],Administration:[{text:'La réunion pédagogique est confirmée pour jeudi à 16h.',mine:false}], 'L2 · Groupe A':[{text:'Bonjour à tous, le support de cours est disponible.',mine:true}]});
 const [resources,setResources] = useState([{name:'Support — Structures de données.pdf',folder:'Algorithmique',type:'PDF',size:'2,4 Mo'},{name:'Exercices — Modèle relationnel.pdf',folder:'Bases de données',type:'PDF',size:'1,1 Mo'},{name:'Introduction à HTML',folder:'Développement web',type:'Lien',size:'MDN Web Docs'}]);
 const [organisations,setOrganisations] = useState({classes:['L2 Informatique · Groupe A','L2 Informatique · Groupe B','L1 Informatique · Groupe A'],filieres:['Informatique','Mathématiques'],matieres:['Algorithmique','Bases de données','Développement web'],annees:['2026 – 2027','2025 – 2026']});
 const [profile,setProfile] = useState({name:'Amine Mansour',email:'amine.mansour@edutek.example',notifications:true});
  const [user,setUserState] = useState<SessionUser|null>(null);
  const [ready,setReady] = useState(false);
  useEffect(()=>{try{const v=sessionStorage.getItem('edutek-user');if(v)setUserState(JSON.parse(v))}catch{}setReady(true)},[]);
  const setUser=(u:SessionUser|null)=>{setUserState(u);if(u)sessionStorage.setItem('edutek-user',JSON.stringify(u));else sessionStorage.removeItem('edutek-user')};
  const [docRequests,setDocRequests] = useState<DocRequest[]>([{id:'d1',student:'Sarah Ben Ali',type:"Attestation d'inscription Français",copies:2,reason:'Dossier de bourse',date:'2026-10-05',status:'Validée',response:'Document prêt. À retirer au bureau de scolarité à partir du 08/10.'},{id:'d2',student:'Youssef Trabelsi',type:'Attestation de présence Anglais',copies:1,reason:'Demande de visa',date:'2026-10-10',status:'En attente'}]);
  const [certRequests,setCertRequests] = useState<CertRequest[]>([{id:'c1',student:'Meriem Khaled',certificate:'Certification en langue anglaise',motivation:'Valider mon niveau B2',date:'2026-10-02',status:'En cours',process:'Dossier reçu. Merci de fournir une copie de la carte d’étudiant et le reçu de paiement des frais d’examen.'}]);
  const [internships,setInternships] = useState<Internship[]>([{id:'i1',student:'Sarah Ben Ali',company:'Tunisie Telecom',subject:'Application de suivi des incidents réseau',supervisor:'Amine Mansour',start:'2026-07-01',end:'2026-08-31',reportStatus:'Non déposé'},{id:'i2',student:'Youssef Trabelsi',company:'InstaDeep',subject:'Tableau de bord d’analyse de données',supervisor:'Amine Mansour',start:'2026-07-01',end:'2026-09-15',report:'rapport-stage-trabelsi.pdf',reportDate:'2026-09-20',reportStatus:'Déposé'}]);
 return {user,setUser,ready,docRequests,setDocRequests,certRequests,setCertRequests,internships,setInternships,role,setRole,courses,setCourses,assignments,setAssignments,people,setPeople,quizzes,setQuizzes,attendance,setAttendance,attendanceHistory,setAttendanceHistory,grades,setGrades,announcements,setAnnouncements,messages,setMessages,resources,setResources,organisations,setOrganisations,profile,setProfile};
}
type Store = ReturnType<typeof useSampleState>;
const g = globalThis as unknown as { __edutekCtx?: React.Context<Store | null> };
const Context = g.__edutekCtx ?? (g.__edutekCtx = createContext<Store | null>(null));
export function EduTekProvider({children}:{children:ReactNode}) { const value=useSampleState(); return <Context.Provider value={value}>{children}</Context.Provider>; }
export function useEduTek() { const value=useContext(Context); if(!value) throw new Error('EduTek provider missing'); return value; }
