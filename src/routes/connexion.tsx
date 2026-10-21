import { createFileRoute,useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { GraduationCap,ArrowUpRight,KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEduTek } from '@/features/edutek/store';
import { roleNames,pageHead,roles,isRole,authenticate,demoAccounts,type Role } from '@/features/edutek/domain';
export const Route=createFileRoute('/connexion')({validateSearch:(s:Record<string,unknown>):{espace?:Role|undefined}=>({espace:typeof s['espace']==='string'&&isRole(s['espace'])?s['espace']:undefined}),head:()=>pageHead('Connexion aux espaces pédagogiques'),component:Connection});
function Connection(){const s=useEduTek();const navigate=useNavigate();const {espace}=Route.useSearch();const [role,setRole]=useState<Role>(espace??'enseignant');const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [error,setError]=useState('');
 const demo=demoAccounts.find(a=>a.role===role)!;
 function submit(e:React.FormEvent){e.preventDefault();const r=authenticate(email,password,role);if('error' in r){setError(r.error??'');return}s.setUser(r.user);s.setRole(role);navigate({to:'/$role',params:{role}})}
 return <main className="grid min-h-screen place-items-center bg-muted px-5"><div className="w-full max-w-md py-12"><GraduationCap size={48} className="mb-5 text-primary"/><h1 className="text-4xl font-semibold">EduTek<span className="text-primary">.</span></h1><p className="mb-8 mt-3 text-muted-foreground">Connectez-vous à votre espace</p>
 <div className="mb-6 grid grid-cols-3 gap-1 rounded-lg bg-card p-1" role="tablist">{roles.map(r=><button key={r} type="button" role="tab" aria-selected={role===r} onClick={()=>{setRole(r);setError('')}} className={`rounded-md px-2 py-2 text-xs font-semibold ${role===r?'bg-primary text-primary-foreground':'text-muted-foreground'}`}>{roleNames[r]}</button>)}</div>
 <form className="space-y-4" onSubmit={submit}><label className="grid gap-2 text-sm">Adresse e-mail<Input type="email" required value={email} onChange={e=>setEmail(e.target.value)} autoComplete="username"/></label><label className="grid gap-2 text-sm">Mot de passe<Input type="password" required value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password"/></label>{error&&<p role="alert" className="text-sm text-destructive">{error}</p>}<Button className="w-full" type="submit">Se connecter — {roleNames[role]}<ArrowUpRight/></Button></form>
 <button type="button" onClick={()=>{setEmail(demo.email);setPassword(demo.password)}} className="mt-6 flex w-full items-start gap-3 rounded-lg border bg-card p-3 text-start text-xs"><KeyRound size={16} className="mt-0.5 text-primary"/><span><b>Compte de démonstration ({roleNames[role]})</b><br/>{demo.email} · {demo.password}<br/><span className="text-muted-foreground">Cliquer pour remplir</span></span></button>
 <p className="mt-6 text-center text-xs text-muted-foreground">Prototype · comptes de démonstration, sans sécurité réelle</p></div></main>}
