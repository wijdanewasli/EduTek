import { Courses } from './courses';
import { Assignments } from './assignments';
import { Quizzes } from './quiz';
import { Classes,Attendance,Grades,Planning } from './academic';
import { Announcements,Messages,Resources,Settings } from './community';
import { Users,Organisation,PhaseTwo } from './admin';
import { canAccess,phaseTwo,type Role,type Section } from './domain';
import { Empty } from './ui';
import { Scolarite,Certifications,Stages } from './school';
export function SectionPage({role,section}:{role:Role;section:Section}){
 if(!canAccess(role,section))return <Empty text="Cette page ne fait pas partie de votre espace."/>;
 if(phaseTwo.includes(section))return <PhaseTwo section={section}/>;
 switch(section){case 'cours':return <Courses role={role}/>;case 'devoirs':return <Assignments role={role}/>;case 'quiz':return <Quizzes role={role}/>;case 'classes':return <Classes role={role}/>;case 'presences':return <Attendance role={role}/>;case 'notes':return <Grades role={role}/>;case 'planning':return <Planning/>;case 'annonces':return <Announcements role={role}/>;case 'messages':return <Messages/>;case 'ressources':return <Resources role={role}/>;case 'parametres':return <Settings/>;case 'utilisateurs':return <Users/>;case 'organisation':return <Organisation/>;case 'scolarite':return <Scolarite role={role}/>;case 'certificats':return <Certifications role={role}/>;case 'stages':return <Stages role={role}/>;default:return <Empty/>}
}
