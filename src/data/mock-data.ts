export type Role = 'user' | 'admin' | 'technician';

export type ResourceType = 'lecture_hall' | 'lab' | 'meeting_room' | 'projector' | 'camera';
export type ResourceStatus = 'ACTIVE' | 'OUT_OF_SERVICE';
export type BookingStatus = 'Pending' | 'Approved' | 'Rejected' | 'Cancelled';
export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Rejected';
export type TicketPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketCategory = 'Maintenance' | 'IT Support' | 'Cleaning' | 'Security' | 'Equipment' | 'Other';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  department: string;
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  capacity: number | null;
  location: string;
  building: string;
  floor: string;
  status: ResourceStatus;
  description: string;
  amenities: string[];
  availableFrom: string;
  availableTo: string;
  image: string;
}

export interface Booking {
  id: string;
  resourceId: string;
  resourceName: string;
  userId: string;
  userName: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  attendees: number;
  status: BookingStatus;
  reason?: string;
  createdAt: string;
  qrCode?: string;
}

export interface TicketComment {
  id: string;
  ticketId: string;
  authorId: string;
  authorName: string;
  authorRole: Role;
  content: string;
  createdAt: string;
}

export interface Ticket {
  id: string;
  title: string;
  resourceId?: string;
  resourceName?: string;
  location: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  description: string;
  reporterId: string;
  reporterName: string;
  assigneeId?: string;
  assigneeName?: string;
  preferredContact: string;
  attachments: string[];
  resolutionNotes?: string;
  comments: TicketComment[];
  createdAt: string;
  updatedAt: string;
  dueAt: string;
  statusHistory: { status: TicketStatus; changedAt: string; changedBy: string }[];
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'booking' | 'ticket' | 'comment' | 'system';
  read: boolean;
  createdAt: string;
  link?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  performedByRole: Role;
  target: string;
  details: string;
  timestamp: string;
}

export const demoUsers: User[] = [
  { id: 'u1', name: 'Alex Johnson', email: 'alex.johnson@university.edu', role: 'user', avatar: 'AJ', department: 'Computer Science' },
  { id: 'u2', name: 'Dr. Sarah Chen', email: 'sarah.chen@university.edu', role: 'admin', avatar: 'SC', department: 'Administration' },
  { id: 'u3', name: 'Marcus Rivera', email: 'marcus.rivera@university.edu', role: 'technician', avatar: 'MR', department: 'Facilities' },
  { id: 'u4', name: 'Emily Park', email: 'emily.park@university.edu', role: 'user', avatar: 'EP', department: 'Physics' },
  { id: 'u5', name: 'James Wilson', email: 'james.wilson@university.edu', role: 'technician', avatar: 'JW', department: 'IT Services' },
];

const resourceImages = [
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&h=400&fit=crop',
];

export const resources: Resource[] = [
  { id: 'r1', name: 'Main Lecture Hall A', type: 'lecture_hall', capacity: 300, location: 'Science Building, Room 101', building: 'Science Building', floor: '1st Floor', status: 'ACTIVE', description: 'Large tiered lecture hall with full AV setup, dual projection screens, and recording capability.', amenities: ['Projector', 'Microphone', 'Recording', 'Air Conditioning', 'Wheelchair Access'], availableFrom: '07:00', availableTo: '22:00', image: resourceImages[0] },
  { id: 'r2', name: 'Computer Lab B2', type: 'lab', capacity: 40, location: 'Engineering Wing, Room 204', building: 'Engineering Wing', floor: '2nd Floor', status: 'ACTIVE', description: 'Modern computer lab with 40 workstations, each with dual monitors and high-spec hardware.', amenities: ['Dual Monitors', 'High-Speed Internet', 'Printer', 'Whiteboard'], availableFrom: '08:00', availableTo: '20:00', image: resourceImages[1] },
  { id: 'r3', name: 'Board Meeting Room', type: 'meeting_room', capacity: 20, location: 'Admin Building, Room 501', building: 'Admin Building', floor: '5th Floor', status: 'ACTIVE', description: 'Executive meeting room with video conferencing, smart TV, and catering access.', amenities: ['Video Conference', 'Smart TV', 'Whiteboard', 'Catering'], availableFrom: '08:00', availableTo: '18:00', image: resourceImages[2] },
  { id: 'r4', name: 'Study Room C3', type: 'meeting_room', capacity: 8, location: 'Library, Room 302', building: 'Library', floor: '3rd Floor', status: 'ACTIVE', description: 'Quiet study and collaboration room for small groups.', amenities: ['Whiteboard', 'Power Outlets', 'Wi-Fi'], availableFrom: '07:00', availableTo: '23:00', image: resourceImages[3] },
  { id: 'r5', name: 'Physics Lab', type: 'lab', capacity: 30, location: 'Science Building, Room 210', building: 'Science Building', floor: '2nd Floor', status: 'OUT_OF_SERVICE', description: 'Specialized physics lab with experimental equipment. Currently under renovation.', amenities: ['Lab Equipment', 'Safety Stations', 'Fume Hood'], availableFrom: '09:00', availableTo: '17:00', image: resourceImages[4] },
  { id: 'r6', name: 'Seminar Room D1', type: 'lecture_hall', capacity: 60, location: 'Arts Building, Room 105', building: 'Arts Building', floor: '1st Floor', status: 'ACTIVE', description: 'Medium-sized seminar room with flexible seating arrangement.', amenities: ['Projector', 'Microphone', 'Flexible Seating'], availableFrom: '08:00', availableTo: '21:00', image: resourceImages[0] },
  { id: 'r7', name: 'Epson EB-2265U Projector', type: 'projector', capacity: null, location: 'AV Equipment Room, Engineering Wing', building: 'Engineering Wing', floor: '1st Floor', status: 'ACTIVE', description: '5500 lumens WUXGA projector, portable with carry case.', amenities: ['HDMI', 'VGA', 'USB', 'Wireless Display'], availableFrom: '07:00', availableTo: '22:00', image: resourceImages[2] },
  { id: 'r8', name: 'Canon XA55 Camera', type: 'camera', capacity: null, location: 'Media Center, Admin Building', building: 'Admin Building', floor: '2nd Floor', status: 'ACTIVE', description: 'Professional 4K UHD camcorder for lectures and events recording.', amenities: ['4K Recording', 'XLR Input', 'Tripod Included', 'SD Card'], availableFrom: '08:00', availableTo: '20:00', image: resourceImages[3] },
  { id: 'r9', name: 'Chemistry Lab A1', type: 'lab', capacity: 25, location: 'Science Building, Room 115', building: 'Science Building', floor: '1st Floor', status: 'ACTIVE', description: 'Fully equipped chemistry laboratory with modern safety features.', amenities: ['Fume Hoods', 'Safety Showers', 'Gas Lines', 'Storage'], availableFrom: '08:00', availableTo: '18:00', image: resourceImages[1] },
  { id: 'r10', name: 'Innovation Hub', type: 'meeting_room', capacity: 50, location: 'Library, Room 101', building: 'Library', floor: '1st Floor', status: 'ACTIVE', description: 'Open collaboration space with modular furniture and AV equipment.', amenities: ['Smart Boards', 'Modular Furniture', '3D Printer', 'VR Station'], availableFrom: '07:00', availableTo: '22:00', image: resourceImages[4] },
];

export const bookings: Booking[] = [
  { id: 'b1', resourceId: 'r1', resourceName: 'Main Lecture Hall A', userId: 'u1', userName: 'Alex Johnson', date: '2026-04-07', startTime: '09:00', endTime: '11:00', purpose: 'CS301 - Advanced Algorithms Lecture', attendees: 120, status: 'Approved', createdAt: '2026-04-01T10:00:00Z', qrCode: 'QR-B1-2026' },
  { id: 'b2', resourceId: 'r3', resourceName: 'Board Meeting Room', userId: 'u1', userName: 'Alex Johnson', date: '2026-04-08', startTime: '14:00', endTime: '16:00', purpose: 'Thesis Committee Meeting', attendees: 6, status: 'Pending', createdAt: '2026-04-03T14:00:00Z' },
  { id: 'b3', resourceId: 'r2', resourceName: 'Computer Lab B2', userId: 'u4', userName: 'Emily Park', date: '2026-04-07', startTime: '13:00', endTime: '15:00', purpose: 'Physics Simulation Workshop', attendees: 35, status: 'Approved', createdAt: '2026-04-02T09:00:00Z', qrCode: 'QR-B3-2026' },
  { id: 'b4', resourceId: 'r6', resourceName: 'Seminar Room D1', userId: 'u4', userName: 'Emily Park', date: '2026-04-09', startTime: '10:00', endTime: '12:00', purpose: 'Guest Speaker: Quantum Computing', attendees: 45, status: 'Pending', createdAt: '2026-04-04T08:00:00Z' },
  { id: 'b5', resourceId: 'r1', resourceName: 'Main Lecture Hall A', userId: 'u1', userName: 'Alex Johnson', date: '2026-04-10', startTime: '14:00', endTime: '16:00', purpose: 'Student Orientation Session', attendees: 200, status: 'Rejected', reason: 'Hall reserved for maintenance that day.', createdAt: '2026-04-03T11:00:00Z' },
  { id: 'b6', resourceId: 'r4', resourceName: 'Study Room C3', userId: 'u1', userName: 'Alex Johnson', date: '2026-04-07', startTime: '16:00', endTime: '18:00', purpose: 'Group Study Session', attendees: 5, status: 'Approved', createdAt: '2026-04-05T12:00:00Z', qrCode: 'QR-B6-2026' },
  { id: 'b7', resourceId: 'r7', resourceName: 'Epson EB-2265U Projector', userId: 'u4', userName: 'Emily Park', date: '2026-04-11', startTime: '09:00', endTime: '17:00', purpose: 'Science Fair Setup', attendees: 1, status: 'Pending', createdAt: '2026-04-05T15:00:00Z' },
  { id: 'b8', resourceId: 'r10', resourceName: 'Innovation Hub', userId: 'u1', userName: 'Alex Johnson', date: '2026-04-12', startTime: '10:00', endTime: '14:00', purpose: 'Hackathon Planning', attendees: 30, status: 'Cancelled', createdAt: '2026-04-01T16:00:00Z' },
];

export const tickets: Ticket[] = [
  {
    id: 't1', title: 'Projector not working in Lecture Hall A', resourceId: 'r1', resourceName: 'Main Lecture Hall A', location: 'Science Building, Room 101',
    category: 'Equipment', priority: 'High', status: 'In Progress', description: 'The main projector in Lecture Hall A is flickering and occasionally goes black during presentations. This has been happening for the past 3 days and is disrupting lectures.',
    reporterId: 'u1', reporterName: 'Alex Johnson', assigneeId: 'u3', assigneeName: 'Marcus Rivera', preferredContact: 'alex.johnson@university.edu',
    attachments: ['projector-issue-1.jpg', 'projector-issue-2.jpg'],
    resolutionNotes: '', comments: [
      { id: 'c1', ticketId: 't1', authorId: 'u1', authorName: 'Alex Johnson', authorRole: 'user', content: 'The issue seems to get worse in the afternoon. Might be overheating?', createdAt: '2026-04-02T11:00:00Z' },
      { id: 'c2', ticketId: 't1', authorId: 'u3', authorName: 'Marcus Rivera', authorRole: 'technician', content: 'I checked the projector. The lamp is nearing end of life. Replacement part has been ordered and should arrive by Thursday.', createdAt: '2026-04-03T09:30:00Z' },
    ],
    createdAt: '2026-04-02T10:00:00Z', updatedAt: '2026-04-03T09:30:00Z', dueAt: '2026-04-05T10:00:00Z',
    statusHistory: [
      { status: 'Open', changedAt: '2026-04-02T10:00:00Z', changedBy: 'Alex Johnson' },
      { status: 'In Progress', changedAt: '2026-04-03T09:00:00Z', changedBy: 'Marcus Rivera' },
    ],
  },
  {
    id: 't2', title: 'AC not functioning in Computer Lab B2', resourceId: 'r2', resourceName: 'Computer Lab B2', location: 'Engineering Wing, Room 204',
    category: 'Maintenance', priority: 'Critical', status: 'Open', description: 'Air conditioning system has completely stopped working. Temperature in the lab is rising and computers are at risk of overheating.',
    reporterId: 'u4', reporterName: 'Emily Park', preferredContact: '555-0102',
    attachments: ['temp-reading.jpg'],
    comments: [
      { id: 'c3', ticketId: 't2', authorId: 'u4', authorName: 'Emily Park', authorRole: 'user', content: 'Temperature reading shows 35°C in the lab. Students are unable to work comfortably.', createdAt: '2026-04-04T14:30:00Z' },
    ],
    createdAt: '2026-04-04T14:00:00Z', updatedAt: '2026-04-04T14:30:00Z', dueAt: '2026-04-05T14:00:00Z',
    statusHistory: [
      { status: 'Open', changedAt: '2026-04-04T14:00:00Z', changedBy: 'Emily Park' },
    ],
  },
  {
    id: 't3', title: 'Broken window lock in Study Room C3', resourceId: 'r4', resourceName: 'Study Room C3', location: 'Library, Room 302',
    category: 'Security', priority: 'Medium', status: 'Resolved',
    description: 'The window lock on the west-facing window is broken. Window can be opened from outside.',
    reporterId: 'u1', reporterName: 'Alex Johnson', assigneeId: 'u5', assigneeName: 'James Wilson', preferredContact: 'alex.johnson@university.edu',
    attachments: [],
    resolutionNotes: 'Replaced the window lock mechanism. Tested and confirmed secure.',
    comments: [
      { id: 'c4', ticketId: 't3', authorId: 'u5', authorName: 'James Wilson', authorRole: 'technician', content: 'Fixed. New lock installed and tested.', createdAt: '2026-04-03T16:00:00Z' },
    ],
    createdAt: '2026-04-01T09:00:00Z', updatedAt: '2026-04-03T16:00:00Z', dueAt: '2026-04-04T09:00:00Z',
    statusHistory: [
      { status: 'Open', changedAt: '2026-04-01T09:00:00Z', changedBy: 'Alex Johnson' },
      { status: 'In Progress', changedAt: '2026-04-02T10:00:00Z', changedBy: 'James Wilson' },
      { status: 'Resolved', changedAt: '2026-04-03T16:00:00Z', changedBy: 'James Wilson' },
    ],
  },
  {
    id: 't4', title: 'Network outage in Arts Building', location: 'Arts Building, Floor 1',
    category: 'IT Support', priority: 'High', status: 'In Progress',
    description: 'Complete network outage on the first floor of the Arts Building. Wi-Fi and ethernet both affected. Students cannot access online resources.',
    reporterId: 'u4', reporterName: 'Emily Park', assigneeId: 'u5', assigneeName: 'James Wilson', preferredContact: 'emily.park@university.edu',
    attachments: ['network-error.jpg'],
    comments: [
      { id: 'c5', ticketId: 't4', authorId: 'u5', authorName: 'James Wilson', authorRole: 'technician', content: 'Identified the issue - main switch on Floor 1 has failed. Arranging replacement.', createdAt: '2026-04-05T11:00:00Z' },
    ],
    createdAt: '2026-04-05T09:00:00Z', updatedAt: '2026-04-05T11:00:00Z', dueAt: '2026-04-06T09:00:00Z',
    statusHistory: [
      { status: 'Open', changedAt: '2026-04-05T09:00:00Z', changedBy: 'Emily Park' },
      { status: 'In Progress', changedAt: '2026-04-05T10:30:00Z', changedBy: 'James Wilson' },
    ],
  },
  {
    id: 't5', title: 'Cleaning request for Innovation Hub', resourceId: 'r10', resourceName: 'Innovation Hub', location: 'Library, Room 101',
    category: 'Cleaning', priority: 'Low', status: 'Closed',
    description: 'Post-event deep cleaning required after weekend workshop.',
    reporterId: 'u1', reporterName: 'Alex Johnson', assigneeId: 'u3', assigneeName: 'Marcus Rivera', preferredContact: 'alex.johnson@university.edu',
    attachments: [],
    resolutionNotes: 'Deep cleaning completed. Room sanitized and restocked.',
    comments: [],
    createdAt: '2026-03-30T08:00:00Z', updatedAt: '2026-03-31T12:00:00Z', dueAt: '2026-04-01T08:00:00Z',
    statusHistory: [
      { status: 'Open', changedAt: '2026-03-30T08:00:00Z', changedBy: 'Alex Johnson' },
      { status: 'In Progress', changedAt: '2026-03-30T14:00:00Z', changedBy: 'Marcus Rivera' },
      { status: 'Resolved', changedAt: '2026-03-31T12:00:00Z', changedBy: 'Marcus Rivera' },
      { status: 'Closed', changedAt: '2026-03-31T14:00:00Z', changedBy: 'Dr. Sarah Chen' },
    ],
  },
];

export const notifications: Notification[] = [
  { id: 'n1', userId: 'u1', title: 'Booking Approved', message: 'Your booking for Main Lecture Hall A on Apr 7 has been approved.', type: 'booking', read: false, createdAt: '2026-04-05T10:00:00Z', link: '/bookings' },
  { id: 'n2', userId: 'u1', title: 'Ticket Update', message: 'Your ticket "Projector not working" has been assigned to Marcus Rivera.', type: 'ticket', read: false, createdAt: '2026-04-03T09:00:00Z', link: '/tickets/t1' },
  { id: 'n3', userId: 'u1', title: 'New Comment', message: 'Marcus Rivera commented on your ticket about the projector.', type: 'comment', read: true, createdAt: '2026-04-03T09:30:00Z', link: '/tickets/t1' },
  { id: 'n4', userId: 'u1', title: 'Booking Rejected', message: 'Your booking for Main Lecture Hall A on Apr 10 was rejected. Reason: Hall reserved for maintenance.', type: 'booking', read: true, createdAt: '2026-04-04T08:00:00Z', link: '/bookings' },
  { id: 'n5', userId: 'u2', title: 'New Booking Request', message: 'Alex Johnson submitted a booking request for Board Meeting Room.', type: 'booking', read: false, createdAt: '2026-04-03T14:00:00Z', link: '/admin/bookings' },
  { id: 'n6', userId: 'u2', title: 'Critical Ticket', message: 'New critical ticket: AC not functioning in Computer Lab B2.', type: 'ticket', read: false, createdAt: '2026-04-04T14:00:00Z', link: '/admin/tickets' },
  { id: 'n7', userId: 'u3', title: 'New Assignment', message: 'You have been assigned to ticket: Projector not working in Lecture Hall A.', type: 'ticket', read: true, createdAt: '2026-04-03T09:00:00Z', link: '/technician/tickets' },
  { id: 'n8', userId: 'u3', title: 'System Update', message: 'Scheduled maintenance window: Apr 12, 2:00 AM - 6:00 AM.', type: 'system', read: false, createdAt: '2026-04-05T08:00:00Z' },
];

export const auditLogs: AuditLog[] = [
  { id: 'a1', action: 'Booking Approved', performedBy: 'Dr. Sarah Chen', performedByRole: 'admin', target: 'Booking #b1', details: 'Approved booking for Main Lecture Hall A by Alex Johnson', timestamp: '2026-04-05T10:00:00Z' },
  { id: 'a2', action: 'Ticket Assigned', performedBy: 'Dr. Sarah Chen', performedByRole: 'admin', target: 'Ticket #t1', details: 'Assigned Marcus Rivera to projector issue ticket', timestamp: '2026-04-03T09:00:00Z' },
  { id: 'a3', action: 'Resource Deactivated', performedBy: 'Dr. Sarah Chen', performedByRole: 'admin', target: 'Physics Lab', details: 'Status changed to OUT_OF_SERVICE for renovation', timestamp: '2026-04-01T14:00:00Z' },
  { id: 'a4', action: 'Booking Rejected', performedBy: 'Dr. Sarah Chen', performedByRole: 'admin', target: 'Booking #b5', details: 'Rejected booking: Hall reserved for maintenance', timestamp: '2026-04-04T08:00:00Z' },
  { id: 'a5', action: 'Ticket Resolved', performedBy: 'James Wilson', performedByRole: 'technician', target: 'Ticket #t3', details: 'Replaced window lock in Study Room C3', timestamp: '2026-04-03T16:00:00Z' },
  { id: 'a6', action: 'Ticket Closed', performedBy: 'Dr. Sarah Chen', performedByRole: 'admin', target: 'Ticket #t5', details: 'Closed cleaning request after resolution confirmed', timestamp: '2026-03-31T14:00:00Z' },
  { id: 'a7', action: 'User Login', performedBy: 'Alex Johnson', performedByRole: 'user', target: 'System', details: 'Logged in via Google OAuth', timestamp: '2026-04-06T08:15:00Z' },
  { id: 'a8', action: 'Resource Created', performedBy: 'Dr. Sarah Chen', performedByRole: 'admin', target: 'Innovation Hub', details: 'Added new resource: Innovation Hub in Library', timestamp: '2026-03-28T10:00:00Z' },
];

export const resourceTypeLabels: Record<ResourceType, string> = {
  lecture_hall: 'Lecture Hall',
  lab: 'Laboratory',
  meeting_room: 'Meeting Room',
  projector: 'Projector',
  camera: 'Camera',
};

export const statusColors: Record<string, string> = {
  ACTIVE: 'bg-success/10 text-success',
  'OUT_OF_SERVICE': 'bg-destructive/10 text-destructive',
  Pending: 'bg-warning/10 text-warning',
  Approved: 'bg-success/10 text-success',
  Rejected: 'bg-destructive/10 text-destructive',
  Cancelled: 'bg-muted text-muted-foreground',
  Open: 'bg-info/10 text-info',
  'In Progress': 'bg-warning/10 text-warning',
  Resolved: 'bg-success/10 text-success',
  Closed: 'bg-muted text-muted-foreground',
  Low: 'bg-muted text-muted-foreground',
  Medium: 'bg-info/10 text-info',
  High: 'bg-warning/10 text-warning',
  Critical: 'bg-destructive/10 text-destructive',
};
