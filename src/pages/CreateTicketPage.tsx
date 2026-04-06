import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { resources, type TicketCategory, type TicketPriority } from '@/data/mock-data';
import { toast } from 'sonner';

const categories: TicketCategory[] = ['Maintenance', 'IT Support', 'Cleaning', 'Security', 'Equipment', 'Other'];
const priorities: TicketPriority[] = ['Low', 'Medium', 'High', 'Critical'];

export default function CreateTicketPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [resourceId, setResourceId] = useState(params.get('resource') || '');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<string>('');
  const [priority, setPriority] = useState<string>('Medium');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);

  const addAttachment = () => {
    if (attachments.length >= 3) { toast.error('Maximum 3 attachments allowed'); return; }
    setAttachments([...attachments, `attachment-${attachments.length + 1}.jpg`]);
    toast.info('Image attached (demo)');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Ticket created successfully!');
    navigate('/tickets');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-1">
        <ArrowLeft className="h-4 w-4" /> Back
      </Button>

      <Card className="shadow-card">
        <CardHeader><CardTitle>Create Support Ticket</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input placeholder="Brief description of the issue" value={title} onChange={e => setTitle(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Resource (optional)</Label>
                <Select value={resourceId} onValueChange={setResourceId}>
                  <SelectTrigger><SelectValue placeholder="Select resource" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    {resources.map(r => <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="Building, room..." value={location} onChange={e => setLocation(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {priorities.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea placeholder="Provide a detailed description of the issue..." value={description} onChange={e => setDescription(e.target.value)} rows={4} />
            </div>

            <div className="space-y-2">
              <Label>Preferred Contact</Label>
              <Input placeholder="Email or phone number" value={contact} onChange={e => setContact(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label>Attachments ({attachments.length}/3)</Label>
              <div className="flex flex-wrap gap-2">
                {attachments.map((a, i) => (
                  <div key={i} className="flex items-center gap-1 px-3 py-1.5 bg-secondary rounded-lg text-xs">
                    📎 {a}
                    <button type="button" onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}><X className="h-3 w-3" /></button>
                  </div>
                ))}
                {attachments.length < 3 && (
                  <Button type="button" variant="outline" size="sm" onClick={addAttachment}>
                    <Upload className="h-3 w-3 mr-1" /> Add Image
                  </Button>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full gradient-primary">Submit Ticket</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
