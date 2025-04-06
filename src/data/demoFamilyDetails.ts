import { FamilyDetail } from '@/components/FamilyDetailModal';

// Demo data for family details
export const demoFamilyDetails: FamilyDetail[] = [
  {
    id: 101,
    name: "Singh Family",
    region: "North India",
    status: "green",
    primaryContact: "Rajveer Singh",
    relationship: "Son",
    phone: "+91 98765 43210",
    email: "rajveer.singh@example.com",
    address: "43, Sector 7, Military Colony",
    district: "Chandigarh",
    state: "Punjab",
    pincode: "160019",
    lastVisit: "2023-10-15",
    martyrInfo: {
      name: "Major Ajay Singh",
      rank: "Major",
      unit: "4 Para (Special Forces)",
      dateOfMartyrdom: "2022-06-12",
      placeOfMartyrdom: "Kupwara, J&K",
      awards: ["Shaurya Chakra", "Sena Medal"]
    },
    familyMembers: [
      {
        id: 1,
        name: "Priya Singh",
        relationship: "Wife",
        age: 32,
        education: "M.Sc. in Mathematics",
        occupation: "School Teacher"
      },
      {
        id: 2,
        name: "Rajveer Singh",
        relationship: "Son",
        age: 10,
        education: "Class 5"
      },
      {
        id: 3,
        name: "Aarti Singh",
        relationship: "Daughter",
        age: 7,
        education: "Class 2"
      }
    ],
    supportStatus: {
      pension: "Approved",
      housing: "Provided",
      education: "Approved",
      healthcare: "Approved",
      employment: "Approved"
    },
    monthlyPension: 85000,
    supportActivities: [
      {
        id: 1,
        date: "2023-09-05",
        activity: "School fee processing and book provisions",
        volunteer: "Amit Kumar",
        status: "completed"
      },
      {
        id: 2,
        date: "2023-08-12",
        activity: "Household visit and needs assessment",
        volunteer: "Neha Sharma",
        status: "completed"
      },
      {
        id: 3,
        date: "2023-10-25",
        activity: "Medical check-up appointment",
        volunteer: "Dr. Vikram Reddy",
        status: "scheduled"
      }
    ],
    supportRequests: [
      {
        id: 1,
        date: "2023-09-10",
        type: "Educational Support",
        description: "Request for additional tutoring for children in science subjects",
        status: "approved"
      }
    ],
    notes: "Family is well-settled. Children are performing well in school. Next priority is to ensure youngest daughter gets the same educational opportunities.",
    assignedVolunteers: [
      {
        id: 1,
        name: "Amit Kumar",
        role: "Education Coordinator",
        contact: "+91 87654 32109"
      },
      {
        id: 2,
        name: "Neha Sharma",
        role: "Family Support Officer",
        contact: "+91 98123 45678"
      }
    ]
  },
  {
    id: 102,
    name: "Sharma Family",
    region: "Central India",
    status: "yellow",
    primaryContact: "Meera Sharma",
    relationship: "Wife",
    phone: "+91 77123 45678",
    email: "meera.sharma@example.com",
    address: "Block D, Flat 304, Shaheed Vihaar",
    district: "Bhopal",
    state: "Madhya Pradesh",
    pincode: "462011",
    lastVisit: "2023-09-28",
    martyrInfo: {
      name: "Captain Rohit Sharma",
      rank: "Captain",
      unit: "21 Rajputana Rifles",
      dateOfMartyrdom: "2021-11-30",
      placeOfMartyrdom: "Siachen Glacier",
      awards: ["Sena Medal"]
    },
    familyMembers: [
      {
        id: 1,
        name: "Meera Sharma",
        relationship: "Wife",
        age: 29,
        education: "B.Com",
        occupation: "Looking for employment"
      },
      {
        id: 2,
        name: "Arjun Sharma",
        relationship: "Son",
        age: 6,
        education: "Class 1"
      },
      {
        id: 3,
        name: "Savitri Sharma",
        relationship: "Mother-in-law",
        age: 56
      }
    ],
    supportStatus: {
      pension: "Approved",
      housing: "Provided",
      education: "Approved",
      healthcare: "In Progress",
      employment: "In Progress"
    },
    monthlyPension: 65000,
    supportActivities: [
      {
        id: 1,
        date: "2023-09-15",
        activity: "Job placement assistance for Mrs. Sharma",
        volunteer: "Rajan Verma",
        status: "scheduled"
      },
      {
        id: 2,
        date: "2023-09-03",
        activity: "Medical check-up for mother-in-law",
        volunteer: "Dr. Anjali Gupta",
        status: "completed"
      }
    ],
    supportRequests: [
      {
        id: 1,
        date: "2023-08-20",
        type: "Employment Assistance",
        description: "Request for job placement in government sector based on reservation policy",
        status: "in-review"
      },
      {
        id: 2,
        date: "2023-09-05",
        type: "Healthcare",
        description: "ECHS card renewal and specialized treatment for mother-in-law's arthritis",
        status: "approved"
      }
    ],
    notes: "Mrs. Sharma is keen on securing employment to augment family income. She has expressed interest in government jobs. Son Arjun needs educational guidance as he's showing signs of emotional stress.",
    assignedVolunteers: [
      {
        id: 1,
        name: "Rajan Verma",
        role: "Employment Coordinator",
        contact: "+91 99876 54321"
      },
      {
        id: 2,
        name: "Dr. Anjali Gupta",
        role: "Healthcare Coordinator",
        contact: "+91 88765 43210"
      }
    ]
  },
  {
    id: 103,
    name: "Mishra Family",
    region: "East India",
    status: "red",
    primaryContact: "Radha Mishra",
    relationship: "Mother",
    phone: "+91 89012 34567",
    email: "radha.mishra@example.com",
    address: "27/4B, Martyrs Lane, Mahavir Nagar",
    district: "Ranchi",
    state: "Jharkhand",
    pincode: "834001",
    lastVisit: "2023-10-02",
    martyrInfo: {
      name: "Lieutenant Amit Mishra",
      rank: "Lieutenant",
      unit: "5 Gorkha Rifles",
      dateOfMartyrdom: "2023-02-14",
      placeOfMartyrdom: "Poonch, J&K",
      awards: ["Kirti Chakra (Posthumous)"]
    },
    familyMembers: [
      {
        id: 1,
        name: "Radha Mishra",
        relationship: "Mother",
        age: 52,
        occupation: "Homemaker"
      },
      {
        id: 2,
        name: "Mohan Mishra",
        relationship: "Father",
        age: 58,
        occupation: "Retired Teacher"
      },
      {
        id: 3,
        name: "Sunita Mishra",
        relationship: "Wife",
        age: 26,
        education: "B.A.",
        occupation: "Housewife"
      },
      {
        id: 4,
        name: "Ananya Mishra",
        relationship: "Daughter",
        age: 1
      }
    ],
    supportStatus: {
      pension: "In Progress",
      housing: "Pending",
      education: "Pending",
      healthcare: "In Progress",
      employment: "Pending"
    },
    monthlyPension: 25000,
    supportActivities: [
      {
        id: 1,
        date: "2023-10-05",
        activity: "Pension documentation assistance",
        volunteer: "Prakash Jha",
        status: "completed"
      },
      {
        id: 2,
        date: "2023-09-20",
        activity: "Healthcare registration for family members",
        volunteer: "Dr. Sanjay Mehta",
        status: "completed"
      },
      {
        id: 3,
        date: "2023-08-15",
        activity: "Legal documentation for property transfer",
        volunteer: "Advocate Kiran Singh",
        status: "canceled"
      }
    ],
    supportRequests: [
      {
        id: 1,
        date: "2023-09-12",
        type: "Housing Assistance",
        description: "Request for housing allotment in military welfare colony",
        status: "pending"
      },
      {
        id: 2,
        date: "2023-09-25",
        type: "Financial Assistance",
        description: "Emergency financial support for medical expenses of infant daughter",
        status: "approved"
      },
      {
        id: 3,
        date: "2023-10-01",
        type: "Pension Processing",
        description: "Expedite processing of full pension benefits",
        status: "in-review"
      }
    ],
    notes: "Family is facing significant financial strain. Lt. Mishra's father has health issues, and the infant daughter needs regular medical attention. Pension disbursement is delayed due to documentation issues. Priority is to expedite pension processing and housing allocation.",
    assignedVolunteers: [
      {
        id: 1,
        name: "Prakash Jha",
        role: "Administrative Coordinator",
        contact: "+91 77654 32109"
      },
      {
        id: 2,
        name: "Dr. Sanjay Mehta",
        role: "Medical Support Officer",
        contact: "+91 98012 34567"
      },
      {
        id: 3,
        name: "Advocate Kiran Singh",
        role: "Legal Aid Volunteer",
        contact: "+91 89123 45678"
      }
    ]
  },
  {
    id: 104,
    name: "Reddy Family",
    region: "South India",
    status: "yellow",
    primaryContact: "Lakshmi Reddy",
    relationship: "Wife",
    phone: "+91 76543 21098",
    email: "lakshmi.reddy@example.com",
    address: "23-1-456, Shanti Nagar, Veer Colony",
    district: "Hyderabad",
    state: "Telangana",
    pincode: "500032",
    lastVisit: "2023-09-10",
    martyrInfo: {
      name: "Subedar Venkat Reddy",
      rank: "Subedar",
      unit: "7 Madras Regiment",
      dateOfMartyrdom: "2022-08-05",
      placeOfMartyrdom: "Eastern Ladakh",
      awards: ["Sena Medal", "Vishisht Seva Medal"]
    },
    familyMembers: [
      {
        id: 1,
        name: "Lakshmi Reddy",
        relationship: "Wife",
        age: 38,
        education: "B.Sc. Nursing",
        occupation: "Nurse at Army Hospital"
      },
      {
        id: 2,
        name: "Karthik Reddy",
        relationship: "Son",
        age: 14,
        education: "Class 9"
      },
      {
        id: 3,
        name: "Divya Reddy",
        relationship: "Daughter",
        age: 12,
        education: "Class 7"
      }
    ],
    supportStatus: {
      pension: "Approved",
      housing: "In Progress",
      education: "Approved",
      healthcare: "Approved",
      employment: "Approved"
    },
    monthlyPension: 55000,
    supportActivities: [
      {
        id: 1,
        date: "2023-08-25",
        activity: "School admission counseling for son",
        volunteer: "Dr. Ramesh Kumar",
        status: "completed"
      },
      {
        id: 2,
        date: "2023-09-18",
        activity: "Housing allocation processing",
        volunteer: "Maj. (Retd.) Suresh Babu",
        status: "scheduled"
      }
    ],
    supportRequests: [
      {
        id: 1,
        date: "2023-07-15",
        type: "Housing Transfer",
        description: "Request for transfer of housing allocation closer to workplace",
        status: "in-review"
      },
      {
        id: 2,
        date: "2023-08-10",
        type: "Educational Scholarship",
        description: "Application for Sainik School admission for son under martyrs' quota",
        status: "approved"
      }
    ],
    notes: "Family is generally well-adjusted. Mrs. Reddy is employed and financially stable. Current priority is housing allocation closer to her workplace and ensuring children's educational needs are met. Son is showing interest in joining the NDA and requires guidance.",
    assignedVolunteers: [
      {
        id: 1,
        name: "Dr. Ramesh Kumar",
        role: "Education Coordinator",
        contact: "+91 87012 34567"
      },
      {
        id: 2,
        name: "Maj. (Retd.) Suresh Babu",
        role: "Housing Coordinator",
        contact: "+91 98765 43210"
      }
    ]
  },
  {
    id: 105,
    name: "Tripathi Family",
    region: "North India",
    status: "green",
    primaryContact: "Deepak Tripathi",
    relationship: "Son",
    phone: "+91 65432 10987",
    email: "deepak.tripathi@example.com",
    address: "14, Rajput Colony, Cantt Area",
    district: "Lucknow",
    state: "Uttar Pradesh",
    pincode: "226002",
    lastVisit: "2023-08-12",
    martyrInfo: {
      name: "Havildar Ramesh Tripathi",
      rank: "Havildar",
      unit: "11 Rajputana Rifles",
      dateOfMartyrdom: "2020-09-10",
      placeOfMartyrdom: "Baramulla, J&K",
      awards: ["Sena Medal"]
    },
    familyMembers: [
      {
        id: 1,
        name: "Sarita Tripathi",
        relationship: "Wife",
        age: 45,
        occupation: "Government Service (Compassionate Appointment)"
      },
      {
        id: 2,
        name: "Deepak Tripathi",
        relationship: "Son",
        age: 21,
        education: "B.Tech Student",
        occupation: "Student"
      }
    ],
    supportStatus: {
      pension: "Approved",
      housing: "Provided",
      education: "Approved",
      healthcare: "Approved",
      employment: "Approved"
    },
    monthlyPension: 45000,
    supportActivities: [
      {
        id: 1,
        date: "2023-06-15",
        activity: "Career counseling for son",
        volunteer: "Col. (Retd.) Sharma",
        status: "completed"
      },
      {
        id: 2,
        date: "2023-07-20",
        activity: "Annual family welfare visit",
        volunteer: "Smt. Anita Verma",
        status: "completed"
      }
    ],
    supportRequests: [
      {
        id: 1,
        date: "2023-05-10",
        type: "Education Loan",
        description: "Request for interest subsidy on education loan for engineering studies",
        status: "approved"
      }
    ],
    notes: "Family is well-settled. Mrs. Tripathi received compassionate appointment in the Defense Accounts Department. Son is pursuing engineering and doing well academically. No immediate concerns.",
    assignedVolunteers: [
      {
        id: 1,
        name: "Col. (Retd.) Sharma",
        role: "Career Counselor",
        contact: "+91 98210 12345"
      },
      {
        id: 2,
        name: "Smt. Anita Verma",
        role: "Family Welfare Officer",
        contact: "+91 87654 32109"
      }
    ]
  },
  {
    id: 106,
    name: "Yadav Family",
    region: "Rural Uttar Pradesh",
    status: "yellow",
    primaryContact: "Savitri Yadav",
    relationship: "Wife",
    phone: "+91 89654 32109",
    email: "savitri.yadav@example.com",
    address: "Village Rampur, Post Chandpur",
    district: "Aligarh",
    state: "Uttar Pradesh",
    pincode: "202001",
    lastVisit: "2023-09-25",
    martyrInfo: {
      name: "Lance Naik Ramesh Yadav",
      rank: "Lance Naik",
      unit: "16 Jat Regiment",
      dateOfMartyrdom: "2022-04-18",
      placeOfMartyrdom: "LOC Uri Sector, J&K",
      awards: ["Mention-in-Dispatches"]
    },
    familyMembers: [
      {
        id: 1,
        name: "Savitri Yadav",
        relationship: "Wife",
        age: 28,
        education: "8th Standard",
        occupation: "Farming"
      },
      {
        id: 2,
        name: "Sonu Yadav",
        relationship: "Son",
        age: 8,
        education: "Class 3"
      },
      {
        id: 3,
        name: "Meena Yadav",
        relationship: "Daughter",
        age: 6,
        education: "Class 1"
      },
      {
        id: 4,
        name: "Khushi Yadav",
        relationship: "Daughter",
        age: 3
      },
      {
        id: 5,
        name: "Ramkali Yadav",
        relationship: "Mother-in-law",
        age: 65
      }
    ],
    supportStatus: {
      pension: "Approved",
      housing: "In Progress",
      education: "In Progress",
      healthcare: "Approved",
      employment: "Pending"
    },
    monthlyPension: 35000,
    supportActivities: [
      {
        id: 1,
        date: "2023-08-12",
        activity: "School admission for children",
        volunteer: "Praveen Sharma",
        status: "completed"
      },
      {
        id: 2,
        date: "2023-09-05",
        activity: "Vocational training options for Mrs. Yadav",
        volunteer: "Anita Gupta",
        status: "scheduled"
      },
      {
        id: 3,
        date: "2023-07-15",
        activity: "Agricultural support program registration",
        volunteer: "Rajesh Tiwari",
        status: "completed"
      }
    ],
    supportRequests: [
      {
        id: 1,
        date: "2023-08-20",
        type: "Education Support",
        description: "Request for Sainik School admission for son under reservation quota",
        status: "in-review"
      },
      {
        id: 2,
        date: "2023-09-10",
        type: "Employment Training",
        description: "Skill development training for Mrs. Yadav to enhance employment opportunities",
        status: "approved"
      }
    ],
    notes: "Family comes from farming background. Mrs. Yadav is keen on ensuring better education for her children. She needs vocational training to supplement family income as they have limited farmland. Local community is supportive, but family requires assistance with agricultural machinery and loans.",
    assignedVolunteers: [
      {
        id: 1,
        name: "Praveen Sharma",
        role: "Education Coordinator",
        contact: "+91 95432 10987"
      },
      {
        id: 2,
        name: "Anita Gupta",
        role: "Vocational Training Coordinator",
        contact: "+91 87654 32109"
      }
    ]
  },
  {
    id: 107,
    name: "Paswan Family",
    region: "Rural Bihar",
    status: "red",
    primaryContact: "Sunil Paswan",
    relationship: "Brother",
    phone: "+91 76543 21098",
    email: "sunilpaswan4467@example.com",
    address: "Dalit Basti, Village Maheshpur",
    district: "Muzaffarpur",
    state: "Bihar",
    pincode: "842001",
    lastVisit: "2023-07-20",
    martyrInfo: {
      name: "Sepoy Manoj Paswan",
      rank: "Sepoy",
      unit: "23 Bihar Regiment",
      dateOfMartyrdom: "2022-12-03",
      placeOfMartyrdom: "Galwan Valley, Ladakh",
      awards: []
    },
    familyMembers: [
      {
        id: 1,
        name: "Geeta Devi",
        relationship: "Mother",
        age: 52,
        occupation: "Daily wage laborer"
      },
      {
        id: 2,
        name: "Sunil Paswan",
        relationship: "Brother",
        age: 25,
        education: "10th Standard",
        occupation: "Construction worker"
      },
      {
        id: 3,
        name: "Kajal Paswan",
        relationship: "Sister",
        age: 16,
        education: "Class 10"
      },
      {
        id: 4,
        name: "Raju Paswan",
        relationship: "Brother",
        age: 14,
        education: "Class 8"
      },
      {
        id: 5,
        name: "Reena Paswan",
        relationship: "Sister-in-law",
        age: 22,
        education: "8th Standard"
      }
    ],
    supportStatus: {
      pension: "In Progress",
      housing: "Pending",
      education: "Pending",
      healthcare: "In Progress",
      employment: "Pending"
    },
    monthlyPension: 15000,
    supportActivities: [
      {
        id: 1,
        date: "2023-07-15",
        activity: "Documentation assistance for full pension benefits",
        volunteer: "Advocate Ranjan Kumar",
        status: "completed"
      },
      {
        id: 2,
        date: "2023-08-10",
        activity: "Healthcare check-up for family members",
        volunteer: "Dr. Sanjay Singh",
        status: "completed"
      },
      {
        id: 3,
        date: "2023-09-05",
        activity: "School admission assistance for younger siblings",
        volunteer: "Manju Kumari",
        status: "scheduled"
      }
    ],
    supportRequests: [
      {
        id: 1,
        date: "2023-08-01",
        type: "Housing Assistance",
        description: "Request for permanent housing under PM Awas Yojana for martyr's family",
        status: "pending"
      },
      {
        id: 2,
        date: "2023-08-15",
        type: "Financial Support",
        description: "Emergency assistance for mother's medical treatment",
        status: "approved"
      },
      {
        id: 3,
        date: "2023-09-01",
        type: "Employment",
        description: "Compassionate appointment for brother Sunil to support family",
        status: "in-review"
      }
    ],
    notes: "Family belongs to scheduled caste community and lives in extreme poverty. They are facing difficulties with documentation for pension due to literacy issues. Younger siblings need educational support. Mother has health issues and can't work regularly. Priority is to secure housing, complete pension process, and provide employment opportunity to eldest brother.",
    assignedVolunteers: [
      {
        id: 1,
        name: "Advocate Ranjan Kumar",
        role: "Legal Aid Volunteer",
        contact: "+91 98765 43210"
      },
      {
        id: 2,
        name: "Dr. Sanjay Singh",
        role: "Medical Support Coordinator",
        contact: "+91 87654 32109"
      },
      {
        id: 3,
        name: "Manju Kumari",
        role: "Education Support Officer",
        contact: "+91 76543 21098"
      }
    ]
  },
  {
    id: 108,
    name: "Meena Family",
    region: "Tribal Rajasthan",
    status: "yellow",
    primaryContact: "Kamala Meena",
    relationship: "Wife",
    phone: "+91 82109 87654",
    email: "kamala.meena@example.com",
    address: "Tribal Village Kherwada, Tehsil Gogunda",
    district: "Udaipur",
    state: "Rajasthan",
    pincode: "313705",
    lastVisit: "2023-08-05",
    martyrInfo: {
      name: "Rifleman Gopal Meena",
      rank: "Rifleman",
      unit: "18 Rajputana Rifles",
      dateOfMartyrdom: "2021-07-29",
      placeOfMartyrdom: "Machil Sector, J&K",
      awards: ["Sena Medal (Posthumous)"]
    },
    familyMembers: [
      {
        id: 1,
        name: "Kamala Meena",
        relationship: "Wife",
        age: 26,
        education: "5th Standard",
        occupation: "Animal husbandry"
      },
      {
        id: 2,
        name: "Raju Meena",
        relationship: "Son",
        age: 7,
        education: "Class 2"
      },
      {
        id: 3,
        name: "Asha Meena",
        relationship: "Daughter",
        age: 5,
        education: "Kindergarten"
      },
      {
        id: 4,
        name: "Dhanraj Meena",
        relationship: "Father-in-law",
        age: 60,
        occupation: "Farming"
      },
      {
        id: 5,
        name: "Shanta Meena",
        relationship: "Mother-in-law",
        age: 55
      }
    ],
    supportStatus: {
      pension: "Approved",
      housing: "In Progress",
      education: "Approved",
      healthcare: "In Progress",
      employment: "In Progress"
    },
    monthlyPension: 40000,
    supportActivities: [
      {
        id: 1,
        date: "2023-07-10",
        activity: "Tribal welfare scheme registration",
        volunteer: "Dinesh Sharma",
        status: "completed"
      },
      {
        id: 2,
        date: "2023-08-15",
        activity: "School transportation arrangement for children",
        volunteer: "Asha Joshi",
        status: "completed"
      },
      {
        id: 3,
        date: "2023-09-20",
        activity: "Skill development program for Mrs. Meena",
        volunteer: "Priyanka Choudhary",
        status: "scheduled"
      }
    ],
    supportRequests: [
      {
        id: 1,
        date: "2023-06-15",
        type: "Agricultural Support",
        description: "Request for irrigation equipment and seeds for family farm",
        status: "approved"
      },
      {
        id: 2,
        date: "2023-07-25",
        type: "Tribal Certificate",
        description: "Assistance in obtaining ST certificate for children for educational benefits",
        status: "in-review"
      },
      {
        id: 3,
        date: "2023-08-20",
        type: "Healthcare",
        description: "Regular medical check-up facility for elderly in-laws in remote village",
        status: "pending"
      }
    ],
    notes: "Family belongs to scheduled tribe community in remote village with limited access to transportation, healthcare, and education. Children have to travel long distance for school. Mrs. Meena is learning tailoring to supplement income. Family has small agricultural land but lacks irrigation facilities. Transportation and accessibility are major challenges.",
    assignedVolunteers: [
      {
        id: 1,
        name: "Dinesh Sharma",
        role: "Tribal Welfare Coordinator",
        contact: "+91 98765 43210"
      },
      {
        id: 2,
        name: "Asha Joshi",
        role: "Education Support Officer",
        contact: "+91 87654 32109"
      },
      {
        id: 3,
        name: "Priyanka Choudhary",
        role: "Skill Development Trainer",
        contact: "+91 76543 21098"
      }
    ]
  },
  {
    id: 109,
    name: "Oraon Family",
    region: "Tribal Jharkhand",
    status: "red",
    primaryContact: "Mangri Oraon",
    relationship: "Mother",
    phone: "+91 94321 87654",
    email: "",
    address: "Adivasi Tola, Village Bero",
    district: "Ranchi",
    state: "Jharkhand",
    pincode: "835204",
    lastVisit: "2023-09-10",
    martyrInfo: {
      name: "Sepoy Birsa Oraon",
      rank: "Sepoy",
      unit: "7 Assam Rifles",
      dateOfMartyrdom: "2023-01-05",
      placeOfMartyrdom: "Manipur",
      awards: []
    },
    familyMembers: [
      {
        id: 1,
        name: "Mangri Oraon",
        relationship: "Mother",
        age: 50,
        occupation: "Forest produce collection"
      },
      {
        id: 2,
        name: "Sukhram Oraon",
        relationship: "Father",
        age: 55,
        occupation: "Farming"
      },
      {
        id: 3,
        name: "Sushila Oraon",
        relationship: "Wife",
        age: 23,
        education: "7th Standard"
      },
      {
        id: 4,
        name: "Munni Oraon",
        relationship: "Daughter",
        age: 2
      }
    ],
    supportStatus: {
      pension: "In Progress",
      housing: "Pending",
      education: "Pending",
      healthcare: "In Progress",
      employment: "Pending"
    },
    monthlyPension: 20000,
    supportActivities: [
      {
        id: 1,
        date: "2023-08-10",
        activity: "Documentation assistance for tribal family",
        volunteer: "Rajiv Toppo",
        status: "completed"
      },
      {
        id: 2,
        date: "2023-09-05",
        activity: "Healthcare check-up for infant daughter",
        volunteer: "Dr. Meena Kujur",
        status: "completed"
      },
      {
        id: 3,
        date: "2023-09-15",
        activity: "Solar lighting installation for home",
        volunteer: "Sunil Lakra",
        status: "scheduled"
      }
    ],
    supportRequests: [
      {
        id: 1,
        date: "2023-07-20",
        type: "Housing Assistance",
        description: "Request for permanent housing as current mud house is in poor condition",
        status: "pending"
      },
      {
        id: 2,
        date: "2023-08-15",
        type: "Financial Support",
        description: "Assistance for setting up small poultry business for sustainable income",
        status: "in-review"
      },
      {
        id: 3,
        date: "2023-09-01",
        type: "Healthcare",
        description: "Regular medical visits for infant daughter who has nutritional deficiencies",
        status: "approved"
      }
    ],
    notes: "Family belongs to particularly vulnerable tribal group with no formal education. They live in remote forest area with limited access to basic amenities. Language barrier exists as they primarily speak tribal dialect. Young widow with infant daughter needs significant support. Family has no bank account and limited understanding of documentation process. They need handholding support for all documentation and benefits.",
    assignedVolunteers: [
      {
        id: 1,
        name: "Rajiv Toppo",
        role: "Tribal Liaison Officer",
        contact: "+91 98765 43210"
      },
      {
        id: 2,
        name: "Dr. Meena Kujur",
        role: "Medical Support Coordinator",
        contact: "+91 87654 32109"
      },
      {
        id: 3,
        name: "Sunil Lakra",
        role: "Rural Development Officer",
        contact: "+91 76543 21098"
      }
    ]
  },
  {
    id: 110,
    name: "Khan Family",
    region: "Rural Haryana",
    status: "yellow",
    primaryContact: "Salma Khan",
    relationship: "Wife",
    phone: "+91 85432 10976",
    email: "salma.khan@example.com",
    address: "Village Chandpur, Near Jama Masjid",
    district: "Mewat",
    state: "Haryana",
    pincode: "122107",
    lastVisit: "2023-08-20",
    martyrInfo: {
      name: "Naik Mohammed Khan",
      rank: "Naik",
      unit: "13 Kumaon Regiment",
      dateOfMartyrdom: "2021-11-10",
      placeOfMartyrdom: "Tawang Sector, Arunachal Pradesh",
      awards: ["Sena Medal"]
    },
    familyMembers: [
      {
        id: 1,
        name: "Salma Khan",
        relationship: "Wife",
        age: 30,
        education: "12th Standard",
        occupation: "Homemaker"
      },
      {
        id: 2,
        name: "Imran Khan",
        relationship: "Son",
        age: 10,
        education: "Class 5"
      },
      {
        id: 3,
        name: "Shabnam Khan",
        relationship: "Daughter",
        age: 8,
        education: "Class 3"
      },
      {
        id: 4,
        name: "Asif Khan",
        relationship: "Son",
        age: 5,
        education: "Kindergarten"
      },
      {
        id: 5,
        name: "Fatima Bi",
        relationship: "Mother-in-law",
        age: 60
      }
    ],
    supportStatus: {
      pension: "Approved",
      housing: "Approved",
      education: "In Progress",
      healthcare: "Approved",
      employment: "In Progress"
    },
    monthlyPension: 45000,
    supportActivities: [
      {
        id: 1,
        date: "2023-07-15",
        activity: "Education scholarship processing for children",
        volunteer: "Feroz Ahmed",
        status: "completed"
      },
      {
        id: 2,
        date: "2023-08-10",
        activity: "Vocational training enrollment for Mrs. Khan",
        volunteer: "Yasmin Sheikh",
        status: "completed"
      },
      {
        id: 3,
        date: "2023-09-20",
        activity: "Computer literacy program for family",
        volunteer: "Arif Hussain",
        status: "scheduled"
      }
    ],
    supportRequests: [
      {
        id: 1,
        date: "2023-06-20",
        type: "Education Support",
        description: "Request for admission in Sainik School for eldest son",
        status: "in-review"
      },
      {
        id: 2,
        date: "2023-07-15",
        type: "Employment Training",
        description: "Computer and English speaking course for Mrs. Khan to enhance employment opportunities",
        status: "approved"
      },
      {
        id: 3,
        date: "2023-08-25",
        type: "Cultural Integration",
        description: "Request for children's participation in Republic Day parade representing martyrs' families",
        status: "pending"
      }
    ],
    notes: "Family is from minority community in rural area. Mrs. Khan is determined to ensure good education for all children. She is learning computer skills to seek employment. Local community is supportive, though family occasionally faces challenges due to their minority status. Children are doing well in studies, with eldest son showing interest in joining armed forces like his father.",
    assignedVolunteers: [
      {
        id: 1,
        name: "Feroz Ahmed",
        role: "Education Coordinator",
        contact: "+91 98765 43210"
      },
      {
        id: 2,
        name: "Yasmin Sheikh",
        role: "Vocational Training Coordinator",
        contact: "+91 87654 32109"
      },
      {
        id: 3,
        name: "Arif Hussain",
        role: "Community Integration Officer",
        contact: "+91 76543 21098"
      }
    ]
  },
  {
    id: 111,
    name: "Lohar Family",
    region: "Rural Maharashtra",
    status: "green",
    primaryContact: "Lakshmi Lohar",
    relationship: "Wife",
    phone: "+91 97654 32109",
    email: "lakshmi.lohar@example.com",
    address: "Village Sonegaon, Tal. Arvi",
    district: "Wardha",
    state: "Maharashtra",
    pincode: "442201",
    lastVisit: "2023-09-15",
    martyrInfo: {
      name: "Havildar Ganpat Lohar",
      rank: "Havildar",
      unit: "11 Maratha Light Infantry",
      dateOfMartyrdom: "2020-06-15",
      placeOfMartyrdom: "Keran Sector, J&K",
      awards: ["Sena Medal"]
    },
    familyMembers: [
      {
        id: 1,
        name: "Lakshmi Lohar",
        relationship: "Wife",
        age: 35,
        education: "10th Standard",
        occupation: "Self-employed (Tailoring)"
      },
      {
        id: 2,
        name: "Vaibhav Lohar",
        relationship: "Son",
        age: 15,
        education: "Class 10"
      },
      {
        id: 3,
        name: "Priya Lohar",
        relationship: "Daughter",
        age: 13,
        education: "Class 8"
      },
      {
        id: 4,
        name: "Arjun Lohar",
        relationship: "Son",
        age: 11,
        education: "Class 6"
      }
    ],
    supportStatus: {
      pension: "Approved",
      housing: "Approved",
      education: "Approved",
      healthcare: "Approved",
      employment: "Approved"
    },
    monthlyPension: 50000,
    supportActivities: [
      {
        id: 1,
        date: "2023-06-10",
        activity: "Tailoring business setup for Mrs. Lohar",
        volunteer: "Sushila Patil",
        status: "completed"
      },
      {
        id: 2,
        date: "2023-07-20",
        activity: "Career counseling for eldest son",
        volunteer: "Raj Deshmukh",
        status: "completed"
      },
      {
        id: 3,
        date: "2023-08-15",
        activity: "Computer training for children",
        volunteer: "Anil Jadhav",
        status: "completed"
      }
    ],
    supportRequests: [
      {
        id: 1,
        date: "2023-05-15",
        type: "Business Expansion",
        description: "Request for additional sewing machines to expand tailoring business",
        status: "approved"
      },
      {
        id: 2,
        date: "2023-07-10",
        type: "Educational Support",
        description: "Coaching classes for eldest son who aims for NDA",
        status: "approved"
      }
    ],
    notes: "Family has adjusted well after initial challenges. Mrs. Lohar runs a successful small tailoring business from home employing two other women from the village. Eldest son is preparing for NDA entrance. Daughter shows talent in academics and sports. Family is financially stable and serves as a positive example for other martyr families in the region.",
    assignedVolunteers: [
      {
        id: 1,
        name: "Sushila Patil",
        role: "Business Development Officer",
        contact: "+91 98765 43210"
      },
      {
        id: 2,
        name: "Raj Deshmukh",
        role: "Career Counselor",
        contact: "+91 87654 32109"
      }
    ]
  },
  {
    id: 112,
    name: "Tiwari Family",
    region: "Rural Uttarakhand",
    status: "green",
    primaryContact: "Rekha Tiwari",
    relationship: "Wife",
    phone: "+91 86543 21098",
    email: "rekha.tiwari@example.com",
    address: "Village Malla Jakhani, Tehsil Didihat",
    district: "Pithoragarh",
    state: "Uttarakhand",
    pincode: "262580",
    lastVisit: "2023-07-25",
    martyrInfo: {
      name: "Naik Jagdish Tiwari",
      rank: "Naik",
      unit: "6 Garhwal Rifles",
      dateOfMartyrdom: "2020-09-30",
      placeOfMartyrdom: "Eastern Ladakh",
      awards: ["Sena Medal"]
    },
    familyMembers: [
      {
        id: 1,
        name: "Rekha Tiwari",
        relationship: "Wife",
        age: 32,
        education: "B.A.",
        occupation: "Government Service (Compassionate Appointment)"
      },
      {
        id: 2,
        name: "Kavita Tiwari",
        relationship: "Daughter",
        age: 9,
        education: "Class 4"
      },
      {
        id: 3,
        name: "Hardik Tiwari",
        relationship: "Son",
        age: 6,
        education: "Class 1"
      },
      {
        id: 4,
        name: "Devki Tiwari",
        relationship: "Mother-in-law",
        age: 58
      }
    ],
    supportStatus: {
      pension: "Approved",
      housing: "Provided",
      education: "Approved",
      healthcare: "Approved",
      employment: "Approved"
    },
    monthlyPension: 45000,
    supportActivities: [
      {
        id: 1,
        date: "2023-04-15",
        activity: "Job placement for Mrs. Tiwari in education department",
        volunteer: "Himanshu Joshi",
        status: "completed"
      },
      {
        id: 2,
        date: "2023-06-20",
        activity: "Home renovation assistance",
        volunteer: "Girish Pant",
        status: "completed"
      },
      {
        id: 3,
        date: "2023-07-10",
        activity: "Education scholarship processing for children",
        volunteer: "Kavita Bisht",
        status: "completed"
      }
    ],
    supportRequests: [
      {
        id: 1,
        date: "2023-05-10",
        type: "Housing Renovation",
        description: "Request for assistance in renovating ancestral home damaged in monsoon",
        status: "approved"
      },
      {
        id: 2,
        date: "2023-06-15",
        type: "Medical Treatment",
        description: "Special medical care for mother-in-law's arthritic condition due to mountain climate",
        status: "approved"
      }
    ],
    notes: "Family is well-settled with Mrs. Tiwari employed as a primary school teacher through compassionate appointment. Despite remote mountain location, family has good access to education and basic healthcare. Children are performing well in studies. Mother-in-law suffers from arthritis due to cold mountain climate and needs regular medical attention.",
    assignedVolunteers: [
      {
        id: 1,
        name: "Himanshu Joshi",
        role: "Employment Coordinator",
        contact: "+91 98765 43210"
      },
      {
        id: 2,
        name: "Girish Pant",
        role: "Housing Support Officer",
        contact: "+91 87654 32109"
      },
      {
        id: 3,
        name: "Kavita Bisht",
        role: "Education Coordinator",
        contact: "+91 76543 21098"
      }
    ]
  }
];

// Function to get family details by ID
export const getFamilyDetailById = (id: number): FamilyDetail | undefined => {
  return demoFamilyDetails.find(family => family.id === id);
}; 