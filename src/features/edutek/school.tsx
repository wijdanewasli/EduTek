import { useState } from 'react';
import { Plus, FileText, Upload, CalendarCheck } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useEduTek, type DocRequest, type CertRequest, type Internship } from './store';
import { documentTypes, type RequestStatus, type Role } from './domain';
import { PageTitle, Field, Select, Status, Table, ModalForm, Empty } from './ui';

const tone = (s: string) => (s === 'Validée' || s === 'Validé' ? 'primary' : s === 'Refusée' || s === 'À corriger' ? 'destructive' : s === 'En cours' || s === 'Déposé' ? 'accent' : 'muted');
const fmt = (d?: string) => (d ? new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }) : '—');
const fmtTime = (d?: string) => (d ? new Date(d).toLocaleString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—');
const statuses: RequestStatus[] = ['En attente', 'En cours', 'Validée', 'Refusée'];
const certificates = ['Certification en langue anglaise', 'Certification en langue française', 'Certification bureautique (C2i)', 'Certification réseaux (CCNA)'];

function useMe() { const s = useEduTek(); return s.user?.name ?? 'Sarah Ben Ali'; }

export function Scolarite({ role }: { role: Role }) {
  const s = useEduTek(); const me = useMe();
  const [open, setOpen] = useState(false); const [type, setType] = useState<string>(documentTypes[0]); const [copies, setCopies] = useState(1); const [reason, setReason] = useState('');
  const [edit, setEdit] = useState<DocRequest | null>(null);
  const list = role === 'etudiant' ? s.docRequests.filter(r => r.student === me) : s.docRequests;
  return <>
    <PageTitle title="Scolarité & documents" subtitle={role === 'etudiant' ? 'Demandez vos attestations administratives et suivez leur traitement.' : 'Traitez les demandes de documents des étudiants.'} action={role === 'etudiant' && <Button onClick={() => setOpen(true)}><Plus />Nouvelle demande</Button>} />
    {role === 'etudiant' && <div className="mb-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{documentTypes.map(d => <button key={d} onClick={() => { setType(d); setOpen(true); }} className="flex items-start gap-2 rounded-lg border bg-card p-3 text-start text-xs font-medium hover:border-primary"><FileText size={16} className="shrink-0 text-primary" />{d}</button>)}</div>}
    {list.length ? <Table headers={[...(role === 'admin' ? ['Étudiant'] : []), 'Document', 'Exemplaires', 'Date', 'Statut', 'Réponse de l’administration', ...(role === 'admin' ? [''] : [])]}>{list.map(r => <tr key={r.id}>{role === 'admin' && <td className="font-medium">{r.student}</td>}<td>{r.type}<p className="text-xs text-muted-foreground">{r.reason}</p></td><td>{r.copies}</td><td>{fmt(r.date)}</td><td><Status tone={tone(r.status)}>{r.status}</Status></td><td className="max-w-xs text-xs text-muted-foreground">{r.response ?? '—'}</td>{role === 'admin' && <td><Button size="sm" variant="outline" onClick={() => setEdit(r)}>Traiter</Button></td>}</tr>)}</Table> : <Empty text="Aucune demande pour le moment." />}
    <ModalForm title="Demande de document" open={open} onClose={() => setOpen(false)} submit="Envoyer la demande" onSubmit={e => { e.preventDefault(); s.setDocRequests(v => [{ id: crypto.randomUUID(), student: me, type, copies, reason: reason || '—', date: new Date().toISOString(), status: 'En attente' }, ...v]); setOpen(false); setReason(''); toast.success('Demande envoyée à la scolarité'); }}>
      <Field label="Type de document"><Select label="Type de document" value={type} onChange={setType} options={[...documentTypes]} /></Field>
      <Field label="Nombre d’exemplaires"><Input type="number" min={1} max={5} value={copies} onChange={e => setCopies(Number(e.target.value))} /></Field>
      <Field label="Motif"><Input value={reason} onChange={e => setReason(e.target.value)} placeholder="Ex. dossier de bourse, visa…" /></Field>
    </ModalForm>
    {edit && <ModalForm title={`Traiter — ${edit.type}`} open onClose={() => setEdit(null)} onSubmit={e => { e.preventDefault(); s.setDocRequests(v => v.map(r => r.id === edit.id ? edit : r)); setEdit(null); toast.success('Réponse envoyée à l’étudiant'); }}>
      <p className="text-sm">{edit.student} · {edit.copies} exemplaire(s) · {edit.reason}</p>
      <Field label="Statut"><Select label="Statut" value={edit.status} onChange={v => setEdit({ ...edit, status: v as RequestStatus })} options={statuses} /></Field>
      <Field label="Réponse"><Textarea value={edit.response ?? ''} onChange={e => setEdit({ ...edit, response: e.target.value })} placeholder="Ex. document prêt à retirer le…" /></Field>
    </ModalForm>}
  </>;
}

export function Certifications({ role }: { role: Role }) {
  const s = useEduTek(); const me = useMe();
  const [open, setOpen] = useState(false); const [cert, setCert] = useState<string>(certificates[0]!); const [motivation, setMotivation] = useState('');
  const [edit, setEdit] = useState<CertRequest | null>(null);
  const list = role === 'etudiant' ? s.certRequests.filter(r => r.student === me) : s.certRequests;
  return <>
    <PageTitle title="Certifications" subtitle={role === 'etudiant' ? 'Demandez à passer une certification ; l’administration vous indique la démarche puis la date de passage.' : 'Indiquez la démarche aux candidats et planifiez les passages validés.'} action={role === 'etudiant' && <Button onClick={() => setOpen(true)}><Plus />Demander à passer</Button>} />
    <div className="grid gap-4 lg:grid-cols-2">{list.length ? list.map(r => <article key={r.id} className="rounded-lg border bg-card p-5">
      <div className="flex items-start justify-between gap-3"><div><h2 className="font-semibold">{r.certificate}</h2><p className="mt-1 text-xs text-muted-foreground">{role === 'admin' && `${r.student} · `}Demande du {fmt(r.date)}</p></div><Status tone={tone(r.status)}>{r.status}</Status></div>
      <p className="mt-3 text-sm text-muted-foreground">{r.motivation}</p>
      <div className="mt-4 rounded-md bg-muted p-3 text-sm"><p className="text-xs font-semibold">Démarche indiquée par l’administration</p><p className="mt-1 text-muted-foreground">{r.process ?? 'En attente de réponse de l’administration.'}</p></div>
      {r.status === 'Validée' && r.examDate && <p className="mt-3 flex items-center gap-2 text-sm font-semibold text-primary"><CalendarCheck size={16} />Passage le {fmtTime(r.examDate)}{r.room && ` · ${r.room}`}</p>}
      {role === 'admin' && <Button className="mt-4" size="sm" variant="outline" onClick={() => setEdit(r)}>Répondre / planifier</Button>}
    </article>) : <Empty text="Aucune demande de certification." />}</div>
    <ModalForm title="Demande de passage" open={open} onClose={() => setOpen(false)} submit="Envoyer" onSubmit={e => { e.preventDefault(); s.setCertRequests(v => [{ id: crypto.randomUUID(), student: me, certificate: cert, motivation: motivation || '—', date: new Date().toISOString(), status: 'En attente' }, ...v]); setOpen(false); setMotivation(''); toast.success('Demande envoyée'); }}>
      <Field label="Certification"><Select label="Certification" value={cert} onChange={setCert} options={certificates} /></Field>
      <Field label="Motivation"><Textarea value={motivation} onChange={e => setMotivation(e.target.value)} /></Field>
    </ModalForm>
    {edit && <ModalForm title={`${edit.student} — ${edit.certificate}`} open onClose={() => setEdit(null)} onSubmit={e => { e.preventDefault(); s.setCertRequests(v => v.map(r => r.id === edit.id ? edit : r)); setEdit(null); toast.success('Réponse envoyée à l’étudiant'); }}>
      <Field label="Statut"><Select label="Statut" value={edit.status} onChange={v => setEdit({ ...edit, status: v as RequestStatus })} options={statuses} /></Field>
      <Field label="Démarche à suivre"><Textarea value={edit.process ?? ''} onChange={e => setEdit({ ...edit, process: e.target.value })} placeholder="Pièces à fournir, frais, étapes…" /></Field>
      {edit.status === 'Validée' && <><Field label="Date et heure de passage"><Input type="datetime-local" required value={edit.examDate ?? ''} onChange={e => setEdit({ ...edit, examDate: e.target.value })} /></Field><Field label="Salle"><Input value={edit.room ?? ''} onChange={e => setEdit({ ...edit, room: e.target.value })} /></Field></>}
    </ModalForm>}
  </>;
}

export function Stages({ role }: { role: Role }) {
  const s = useEduTek(); const me = useMe();
  const [edit, setEdit] = useState<Internship | null>(null); const [declare, setDeclare] = useState(false);
  const [form, setForm] = useState({ company: '', subject: '', supervisor: 'Amine Mansour', start: '', end: '' });
  const list = role === 'etudiant' ? s.internships.filter(i => i.student === me) : role === 'enseignant' ? s.internships.filter(i => i.supervisor === (s.user?.name ?? s.profile.name)) : s.internships;
  const update = (i: Internship) => s.setInternships(v => v.map(x => x.id === i.id ? i : x));
  return <>
    <PageTitle title="Stages & soutenances" subtitle={role === 'etudiant' ? 'Déclarez votre stage, déposez votre rapport et consultez votre soutenance.' : role === 'enseignant' ? 'Suivez vos stagiaires, validez les rapports et notez les soutenances.' : 'Planifiez les soutenances et suivez les rapports de stage.'} action={role === 'etudiant' && <Button onClick={() => setDeclare(true)}><Plus />Déclarer un stage</Button>} />
    <div className="grid gap-4">{list.length ? list.map(i => <article key={i.id} className="rounded-lg border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold text-primary">{i.company}</p><h2 className="mt-1 font-semibold">{i.subject}</h2><p className="mt-1 text-xs text-muted-foreground">{i.student} · Encadrant : {i.supervisor} · {fmt(i.start)} → {fmt(i.end)}</p></div><Status tone={tone(i.reportStatus)}>Rapport : {i.reportStatus}</Status></div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-md bg-muted p-3 text-sm"><p className="text-xs font-semibold">Espace de dépôt du rapport</p>{i.report ? <p className="mt-1 flex items-center gap-2"><FileText size={15} />{i.report} <span className="text-xs text-muted-foreground">· {fmt(i.reportDate)}</span></p> : <p className="mt-1 text-muted-foreground">Aucun rapport déposé.</p>}{i.feedback && <p className="mt-2 text-xs text-muted-foreground">Retour : {i.feedback}</p>}
          {role === 'etudiant' && i.reportStatus !== 'Validé' && <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-md border bg-card px-3 py-2 text-xs font-medium"><Upload size={14} />{i.report ? 'Remplacer le rapport' : 'Déposer le rapport (PDF)'}<input type="file" accept=".pdf,.doc,.docx" className="sr-only" aria-label="Déposer le rapport" onChange={e => { const f = e.target.files?.[0]; if (f) { update({ ...i, report: f.name, reportDate: new Date().toISOString(), reportStatus: 'Déposé' }); toast.success('Rapport déposé'); } }} /></label>}
          {role === 'enseignant' && i.report && <div className="mt-3 flex gap-2"><Button size="sm" onClick={() => { update({ ...i, reportStatus: 'Validé', feedback: 'Rapport validé pour la soutenance.' }); toast.success('Rapport validé'); }}>Valider</Button><Button size="sm" variant="outline" onClick={() => { update({ ...i, reportStatus: 'À corriger', feedback: 'Merci de revoir la partie conclusion et la bibliographie.' }); toast('Corrections demandées'); }}>Demander des corrections</Button></div>}
        </div>
        <div className="rounded-md bg-muted p-3 text-sm"><p className="text-xs font-semibold">Soutenance</p>{i.defenseDate ? <><p className="mt-1 flex items-center gap-2 font-medium"><CalendarCheck size={15} className="text-primary" />{fmtTime(i.defenseDate)} · {i.defenseRoom}</p><p className="mt-1 text-xs text-muted-foreground">Jury : {i.jury}</p>{i.defenseGrade !== undefined && <p className="mt-1 font-semibold">Note : {i.defenseGrade}/20</p>}</> : <p className="mt-1 text-muted-foreground">Non planifiée.</p>}
          {role !== 'etudiant' && <Button className="mt-3" size="sm" variant="outline" onClick={() => setEdit(i)}>{role === 'admin' ? 'Planifier la soutenance' : 'Noter la soutenance'}</Button>}
        </div>
      </div>
    </article>) : <Empty text="Aucun stage enregistré." />}</div>
    <ModalForm title="Déclarer un stage" open={declare} onClose={() => setDeclare(false)} onSubmit={e => { e.preventDefault(); s.setInternships(v => [...v, { id: crypto.randomUUID(), student: me, ...form, reportStatus: 'Non déposé' }]); setDeclare(false); toast.success('Stage déclaré'); }}>
      <Field label="Entreprise"><Input required value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} /></Field>
      <Field label="Sujet"><Input required value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} /></Field>
      <Field label="Encadrant"><Select label="Encadrant" value={form.supervisor} onChange={v => setForm({ ...form, supervisor: v })} options={s.people.filter(p => p.role === 'enseignant').map(p => p.name)} /></Field>
      <div className="grid grid-cols-2 gap-3"><Field label="Début"><Input type="date" required value={form.start} onChange={e => setForm({ ...form, start: e.target.value })} /></Field><Field label="Fin"><Input type="date" required value={form.end} onChange={e => setForm({ ...form, end: e.target.value })} /></Field></div>
    </ModalForm>
    {edit && <ModalForm title={`Soutenance — ${edit.student}`} open onClose={() => setEdit(null)} onSubmit={e => { e.preventDefault(); update(edit); setEdit(null); toast.success('Soutenance enregistrée'); }}>
      {role === 'admin' ? <><Field label="Date et heure"><Input type="datetime-local" required value={edit.defenseDate ?? ''} onChange={e => setEdit({ ...edit, defenseDate: e.target.value })} /></Field><Field label="Salle"><Input required value={edit.defenseRoom ?? ''} onChange={e => setEdit({ ...edit, defenseRoom: e.target.value })} /></Field><Field label="Jury"><Input required value={edit.jury ?? ''} onChange={e => setEdit({ ...edit, jury: e.target.value })} placeholder="Président, rapporteur, encadrant" /></Field></>
        : <Field label="Note de soutenance (/20)"><Input type="number" min={0} max={20} step={0.25} required value={edit.defenseGrade ?? ''} onChange={e => setEdit({ ...edit, defenseGrade: Number(e.target.value) })} /></Field>}
    </ModalForm>}
  </>;
}
