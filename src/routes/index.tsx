import { createFileRoute } from '@tanstack/react-router';
import { Dashboard } from '@/features/edutek/dashboard';
import { Workspace } from '@/features/edutek/workspace';
import { useEduTek } from '@/features/edutek/store';
import { pageHead } from '@/features/edutek/domain';
export const Route=createFileRoute('/')({head:()=>pageHead('Vue d’ensemble pédagogique'),component:Index});
function Index(){const {role}=useEduTek();return <Workspace><Dashboard role={role}/></Workspace>}
