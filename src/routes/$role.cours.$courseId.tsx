import { createFileRoute } from '@tanstack/react-router';
import { CourseDetail } from '@/features/edutek/courses';
import { isRole,pageHead } from '@/features/edutek/domain';
import { initialCourses } from '@/features/edutek/store';
export const Route=createFileRoute('/$role/cours/$courseId')({head:({params})=>pageHead(initialCourses.find(c=>c.id===params.courseId)?.title??'Contenu du cours'),component:Page});
function Page(){const {role,courseId}=Route.useParams();return isRole(role)?<CourseDetail role={role} courseId={courseId}/>:null}
