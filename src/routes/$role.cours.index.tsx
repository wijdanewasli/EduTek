import { createFileRoute } from '@tanstack/react-router';
import { Courses } from '@/features/edutek/courses';
import { isRole,pageHead } from '@/features/edutek/domain';
export const Route=createFileRoute('/$role/cours/')({head:()=>pageHead('Catalogue de mes cours'),component:Page});
function Page(){const {role}=Route.useParams();return isRole(role)?<Courses role={role}/>:null}
