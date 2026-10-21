import { createFileRoute } from '@tanstack/react-router';
import { SectionPage } from '@/features/edutek/section';
import { isRole,sectionTitles,pageHead } from '@/features/edutek/domain';
export const Route=createFileRoute('/$role/scolarite')({head:()=>pageHead(sectionTitles.scolarite),component:Page});
function Page(){const {role}=Route.useParams();return isRole(role)?<SectionPage role={role} section="scolarite"/>:null}
