import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MapPin, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusBadge } from '@/components/StatusBadge';
import { resources, resourceTypeLabels, type ResourceType } from '@/data/mock-data';

export default function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  const buildings = [...new Set(resources.map(r => r.building))];

  const filtered = resources.filter(r => {
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.location.toLowerCase().includes(search.toLowerCase())) return false;
    if (typeFilter !== 'all' && r.type !== typeFilter) return false;
    if (locationFilter !== 'all' && r.building !== locationFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Resources Catalogue</h1>
        <p className="text-sm text-muted-foreground mt-1">Browse and book university facilities and equipment.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search resources..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-full sm:w-44"><Filter className="h-4 w-4 mr-2" /><SelectValue placeholder="Type" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {(Object.keys(resourceTypeLabels) as ResourceType[]).map(k => (
              <SelectItem key={k} value={k}>{resourceTypeLabels[k]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="w-full sm:w-48"><MapPin className="h-4 w-4 mr-2" /><SelectValue placeholder="Building" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Buildings</SelectItem>
            {buildings.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} resources found</p>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(r => (
          <Link key={r.id} to={`/resources/${r.id}`}>
            <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 cursor-pointer h-full">
              <div className="h-40 bg-secondary overflow-hidden">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-sm">{r.name}</h3>
                    <p className="text-xs text-muted-foreground">{resourceTypeLabels[r.type]}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3">
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{r.building}</span>
                  {r.capacity && <span className="flex items-center gap-1"><Users className="h-3 w-3" />{r.capacity}</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-2">Available {r.availableFrom}–{r.availableTo}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
