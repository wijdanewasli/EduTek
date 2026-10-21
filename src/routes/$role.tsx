import { createFileRoute,Outlet,notFound } from '@tanstack/react-router';
import { Workspace } from '@/features/edutek/workspace';
import { isRole,roleNames,pageHead } from '@/features/edutek/domain';
export const Route=createFileRoute('/$role')({beforeLoad:({params})=>{if(!isRole(params.role))throw notFound()},head:({params})=>pageHead(isRole(params.role)?`Espace ${roleNames[params.role]}`:'Espace pédagogique'),component:Layout});
function Layout(){const {role}=Route.useParams();if(!isRole(role))return null;return <Workspace role={role}><Outlet/></Workspace>}
