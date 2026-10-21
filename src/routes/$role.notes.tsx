import { createFileRoute } from '@tanstack/react-router';
import { SectionPage } from '@/features/edutek/section';
import { isRole,sectionTitles,pageHead } from '@/features/edutek/domain';
export const Route=createFileRoute('/$role/notes')({head:()=>pageHead(sectionTitles.notes),component:Page});
function Page(){const {role}=Route.useParams();return isRole(role)?<SectionPage role={role} section="notes"/>:null}
