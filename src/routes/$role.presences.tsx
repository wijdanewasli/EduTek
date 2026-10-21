import { createFileRoute } from '@tanstack/react-router';
import { SectionPage } from '@/features/edutek/section';
import { isRole,sectionTitles,pageHead } from '@/features/edutek/domain';
export const Route=createFileRoute('/$role/presences')({head:()=>pageHead(sectionTitles.presences),component:Page});
function Page(){const {role}=Route.useParams();return isRole(role)?<SectionPage role={role} section="presences"/>:null}
