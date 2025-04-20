
import { Booking, Subscription, Captain } from "./models";

// Sample captains data
export const captains: Captain[] = [
  {
    id: "captain1",
    userId: "user1",
    name: "John Smith",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8
  },
  {
    id: "captain2",
    userId: "user2",
    name: "Maria Rodriguez",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 4.9
  },
  {
    id: "captain3",
    userId: "user3",
    name: "David Johnson",
    image: "https://randomuser.me/api/portraits/men/44.jpg",
    rating: 4.7
  }
];

// Sample subscriptions data
export const subscriptions: Subscription[] = [
  {
    id: "sub1",
    subscription_id: "SUB-001-2023",
    planId: "deep-cleaning-monthly",
    userId: "current-user",
    vehicle_number: "ABC-1234",
    start_date: "2023-06-15",
    end_date: "2023-07-15",
    total_visits: 2,
    visits_used: 1,
    status: "active"
  },
  {
    id: "sub2",
    subscription_id: "SUB-002-2023",
    planId: "bathroom-cleaning-monthly",
    userId: "current-user",
    vehicle_number: "XYZ-5678",
    start_date: "2023-06-05",
    end_date: "2023-07-05",
    total_visits: 2,
    visits_used: 2,
    status: "active"
  },
  {
    id: "sub3",
    subscription_id: "SUB-003-2023",
    planId: "deep-cleaning-yearly",
    userId: "current-user",
    vehicle_number: "DEF-9012",
    start_date: "2023-01-01",
    end_date: "2023-12-31",
    total_visits: 24,
    visits_used: 5,
    status: "active"
  }
];

// Sample bookings data
export const bookings: Booking[] = [
  // For monthly deep cleaning subscription
  {
    id: "book1",
    subscriptionId: "sub1",
    visit_number: 1,
    captainScheduleId: "sched1",
    captainId: "captain1",
    captainName: "John Smith",
    captainImage: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "2023-06-20",
    time: "09:00 AM",
    address: "123 Main St, Apt 4B, New York, NY 10001",
    price: 200,
    status: "upcoming"
  },
  {
    id: "book2",
    subscriptionId: "sub1",
    visit_number: 2,
    captainScheduleId: "sched2",
    captainId: "captain2",
    captainName: "Maria Rodriguez",
    captainImage: "https://randomuser.me/api/portraits/women/65.jpg",
    date: "2023-07-05",
    time: "10:30 AM",
    address: "123 Main St, Apt 4B, New York, NY 10001",
    price: 200,
    status: "upcoming"
  },
  
  // For yearly deep cleaning subscription
  {
    id: "book3",
    subscriptionId: "sub3",
    visit_number: 1,
    captainScheduleId: "sched3",
    captainId: "captain3",
    captainName: "David Johnson",
    captainImage: "https://randomuser.me/api/portraits/men/44.jpg",
    date: "2023-01-15",
    time: "02:00 PM",
    address: "789 Residential Rd, Chicago, IL 60601",
    price: 170,
    status: "completed"
  },
  {
    id: "book4",
    subscriptionId: "sub3",
    visit_number: 2,
    captainScheduleId: "sched4",
    captainId: "captain1",
    captainName: "John Smith",
    captainImage: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "2023-02-15",
    time: "11:00 AM",
    address: "789 Residential Rd, Chicago, IL 60601",
    price: 170,
    status: "completed"
  },
  {
    id: "book5",
    subscriptionId: "sub3",
    visit_number: 3,
    captainScheduleId: "sched5",
    captainId: "captain2",
    captainName: "Maria Rodriguez",
    captainImage: "https://randomuser.me/api/portraits/women/65.jpg",
    date: "2023-03-15",
    time: "01:00 PM",
    address: "789 Residential Rd, Chicago, IL 60601",
    price: 170,
    status: "completed"
  },
  {
    id: "book6",
    subscriptionId: "sub3",
    visit_number: 4,
    captainScheduleId: "sched6",
    captainId: "captain3",
    captainName: "David Johnson",
    captainImage: "https://randomuser.me/api/portraits/men/44.jpg",
    date: "2023-04-15",
    time: "03:00 PM",
    address: "789 Residential Rd, Chicago, IL 60601",
    price: 170,
    status: "completed"
  },
  {
    id: "book7",
    subscriptionId: "sub3",
    visit_number: 5,
    captainScheduleId: "sched7",
    captainId: "captain1",
    captainName: "John Smith",
    captainImage: "https://randomuser.me/api/portraits/men/32.jpg",
    date: "2023-05-15",
    time: "09:00 AM",
    address: "789 Residential Rd, Chicago, IL 60601",
    price: 170,
    status: "completed"
  },
  {
    id: "book8",
    subscriptionId: "sub3",
    visit_number: 6,
    captainScheduleId: "sched8",
    captainId: "captain2",
    captainName: "Maria Rodriguez",
    captainImage: "https://randomuser.me/api/portraits/women/65.jpg",
    date: "2023-06-15",
    time: "10:00 AM",
    address: "789 Residential Rd, Chicago, IL 60601",
    price: 170,
    status: "upcoming"
  }
];

// Helper functions
export const getSubscriptionById = (id: string) => {
  return subscriptions.find(sub => sub.id === id);
};

export const getBookingsBySubscriptionId = (subscriptionId: string) => {
  return bookings.filter(booking => booking.subscriptionId === subscriptionId);
};

export const getBookingById = (id: string) => {
  return bookings.find(booking => booking.id === id);
};

export const getUserSubscriptions = (userId: string = "current-user") => {
  return subscriptions.filter(sub => sub.userId === userId);
};
