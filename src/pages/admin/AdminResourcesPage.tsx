import { useState } from 'react';
import { Plus, Edit, Power } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '@/components/StatusBadge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { resources, resourceTypeLabels, type Resource, type ResourceType } from '@/data/mock-data';
import { toast } from 'sonner';

export default function AdminResourcesPage() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Resource | null>(null);

  const handleSave = () => {
    toast.success(editing ? 'Resource updated!' : 'Resource created!');
    setShowForm(false);
    setEditing(null);
  };

  const toggleStatus = (r: Resource) => {
    toast.success(`${r.name} ${r.status === 'ACTIVE' ? 'deactivated' : 'activated'} (demo)`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Manage Resources</h1>
          <p className="text-sm text-muted-foreground mt-1">Add, edit, and manage campus resources.</p>
        </div>
        <Button onClick={() => { setEditing(null); setShowForm(true); }}><Plus className="mr-2 h-4 w-4" />Add Resource</Button>
      </div>

      <div className="space-y-3">
        {resources.map(r => (
          <Card key={r.id} className="shadow-card">
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-4 flex-1">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary shrink-0">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-semibold text-sm">{r.name}</h3>
                    <StatusBadge status={r.status} />
                  </div>
                  <p className="text-xs text-muted-foreground">{resourceTypeLabels[r.type]} • {r.location}</p>
                  {r.capacity && <p className="text-xs text-muted-foreground">Capacity: {r.capacity}</p>}
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => { setEditing(r); setShowForm(true); }}>
                  <Edit className="h-3 w-3 mr-1" /> Edit
                </Button>
                <Button variant="outline" size="sm" onClick={() => toggleStatus(r)}
                  className={r.status === 'ACTIVE' ? 'text-destructive' : 'text-success'}>
                  <Power className="h-3 w-3 mr-1" /> {r.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing ? 'Edit Resource' : 'Add New Resource'}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2"><Label>Name</Label><Input defaultValue={editing?.name || ''} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select defaultValue={editing?.type || ''}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    {(Object.keys(resourceTypeLabels) as ResourceType[]).map(k => (
                      <SelectItem key={k} value={k}>{resourceTypeLabels[k]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Capacity</Label><Input type="number" defaultValue={editing?.capacity || ''} /></div>
            </div>
            <div className="space-y-2"><Label>Location</Label><Input defaultValue={editing?.location || ''} /></div>
            <div className="space-y-2"><Label>Description</Label><Textarea defaultValue={editing?.description || ''} rows={3} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button className="gradient-primary" onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
