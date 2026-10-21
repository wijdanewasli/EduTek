import { createFileRoute,Outlet } from '@tanstack/react-router';
import { SectionPage } from '@/features/edutek/section';
import { isRole,sectionTitles,pageHead } from '@/features/edutek/domain';
export const Route=createFileRoute('/$role/cours')({head:()=>pageHead(sectionTitles.cours),component:Page});
function Page(){return <Outlet/>;}
