import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/features/edutek/dashboard';
import { isRole,roleNames,pageHead } from '@/features/edutek/domain';
export const Route=createFileRoute('/$role/')({head:({params})=>pageHead(`Tableau de bord ${isRole(params.role)?roleNames[params.role]:''}`),component:Page});
function Page(){const {role}=Route.useParams();return isRole(role)?<Dashboard role={role}/>:null}
