"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Data array (truncated for brevity, use the full array in your code)
const connectionsData = [
  {
    "S. No.": 1,
    "Name": "Shubham Kumar",
    "Organization Name": "StoryLight Media",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "Marketing",
    "Sub Sector": "creative video-editing agency",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9266349873,
    "Email ID": "shubhamkumar2002@gmail.com",
    "Linkedin": "linkedin.com/in/beshubhamkumar",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_100newfriends-activity-7273945053360758784-iKip?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 2,
    "Name": "Yash Malhotra",
    "Organization Name": "SAR Group & SAR ELECTRIC MOBILITY",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Manufacturing",
    "Sub Sector": "Home Appliance, Energy Storage, Energy Transition & Electric Mobility",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Chief Transformation& Growth Officer",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9958793331,
    "Email ID": "yash.malhotra@sar-group.com",
    "Linkedin": "linkedin.com/in/yashmalhotra1997",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-yash-malhotra-activity-7341668633179209728-vmdS?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 3,
    "Name": "Kaushik Dey",
    "Organization Name": "PWC",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Social Sector",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Director",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9830562102,
    "Email ID": "k4knights@gmail.com",
    "Linkedin": "linkedin.com/in/kaushikdey1985",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-kaushik-dey-activity-7340207137219821571-cB6p?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 4,
    "Name": "Shaily Gupta",
    "Organization Name": "Khaitan & Company",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Legal",
    "Sub Sector": "TAX & LAW",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Partner",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "NA",
    "Email ID": "shaily.gupta@khaitanco.com / shly_gupta@rediffmail.com",
    "Linkedin": "linkedin.com/in/shaily-gupta-khandelwal",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-shaily-gupta-activity-7339856694312693762-fEeN?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 5,
    "Name": "Nikhil Gaur",
    "Organization Name": "Hive Business School",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "Education",
    "Sub Sector": "Business School",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 7838004039,
    "Email ID": "nikhil@hiveschool.co",
    "Linkedin": "linkedin.com/in/nikhilgaur20",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-nikhil-gaur-founder-activity-7339545963100872704-CCC8?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 6,
    "Name": "Pankaj Doval",
    "Organization Name": "Times of India",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Media",
    "Sub Sector": "Media",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "National Editor",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9868105558,
    "Email ID": "dovalpankaj@gmail.com",
    "Linkedin": "linkedin.com/in/pankaj-doval-34a70933",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-pankaj-doval-activity-7338040970199867396-RM7Q?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 7,
    "Name": "Suyash Sharma",
    "Organization Name": "Khaitan & Company",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Legal",
    "Sub Sector": "Corp Strategy",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Sr. Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 7045015504,
    "Email ID": "sharma.suyash@khaitanco.com",
    "Linkedin": "linkedin.com/in/suyash-sajjan-sharma",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-suyash-sharma-activity-7337682103691550720-Z2h-?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 8,
    "Name": "Simran Thadani",
    "Organization Name": "HDFC BANK",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Bank",
    "Sub Sector": "Credit Risk",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 9890009754,
    "Email ID": "simran@thadhani.info",
    "Linkedin": "linkedin.com/in/simran-thadhani",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-simran-thadani-activity-7336595824354697217-yFQy?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 9,
    "Name": "Kaushal Karia",
    "Organization Name": "Vedic Garden",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "FMCG",
    "Sub Sector": "D2C",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9377743444,
    "Email ID": "kaushal9999@gmail.com",
    "Linkedin": "linkedin.com/in/kaushal-karia-a72764a",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-kaushal-karia-activity-7335511489090306049-jofr?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 10,
    "Name": "Ankur Nehra",
    "Organization Name": "Khaitan & Company",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Legal",
    "Sub Sector": "Corp Strategy",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Sr. Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "NA",
    "Email ID": "ankurnehra@gmail.com",
    "Linkedin": "linkedin.com/in/ankur-nehra",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-ankur-nehra-activity-7335132150918193155-oFtc?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 11,
    "Name": "Rahul Joshi",
    "Organization Name": "BNP Paribas",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Finance",
    "Sub Sector": "Communications & Brand",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "AVP",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 9619583385,
    "Email ID": "rahuladfactorspr@gmail.com",
    "Linkedin": "linkedin.com/in/rahul1064",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-rahul-joshi-activity-7334802512622886912-4NCW?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 12,
    "Name": "Jonathan Ferdinand-Dreyfus",
    "Organization Name": "TORM",
    "Organization Type (Small/ Medium/ Large)": "Medium",
    "Industry": "Shipping",
    "Sub Sector": "Product Tanker Shipping",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Research Assitant",
    "Designation Type (Senior/ Mid/ Entry Level)": "Entry level",
    "Phone Number": "NA",
    "Email ID": "jonathan.dreyfus@outlook.com",
    "Linkedin": "linkedin.com/in/jonathan-ferdinand-dreyfus-15026b154",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-jonathan-activity-7334462388202590209-pU9k?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 13,
    "Name": "Dr. Aparna Pasumarthy",
    "Organization Name": "University of Pennsylvania",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Education",
    "Sub Sector": "Researching professional careers",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Lecturer",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "NA",
    "Email ID": "dr.aparnapasumarthy@gmail.com",
    "Linkedin": "linkedin.com/in/aparnapasumarthy",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-dr-aparna-pasumarthy-activity-7315555307164745729-QOo8?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 14,
    "Name": "Ashish Panigrahi",
    "Organization Name": "Nielsen/ RSB Insights & Analytics",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Public Policy",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Global Head – Social Development Research",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9811204796,
    "Email ID": "ashish.panigrahi2161@gmail.com",
    "Linkedin": "linkedin.com/in/ashish-panigrahi-3a057536",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-ashish-panigrahi-activity-7312060974297935872-Rst6?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 15,
    "Name": "Mayank Sehgal",
    "Organization Name": "Qube Cinema",
    "Organization Type (Small/ Medium/ Large)": "Medium",
    "Industry": "Media & Entertainment",
    "Sub Sector": "Digital Cinema Technology",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Associate Vice President",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9873551422,
    "Email ID": "mayank.sehgal.redfm@gmail.com",
    "Linkedin": "linkedin.com/in/mayanksehgal",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-mayank-sehgal-arun-activity-7311582884929097729-twVX?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 16,
    "Name": "Ankit Aggarwal",
    "Organization Name": "Unstop",
    "Organization Type (Small/ Medium/ Large)": "Medium",
    "Industry": "HR Tech",
    "Sub Sector": "Talent Discovery & Campus Hiring Platforms",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "NA",
    "Email ID": "NA",
    "Linkedin": "linkedin.com/in/unstoppableankit",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-ankit-aggarwal-activity-7311218786097840128-wgmj?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 17,
    "Name": "Aalok Joshi",
    "Organization Name": "Accenture Strategy",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Fintech",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 9871534163,
    "Email ID": "aalok.joshi7@gmail.com",
    "Linkedin": "linkedin.com/in/aalok-joshi-strategy",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-aalok-joshi-activity-7310863828538273792-7Lk8?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 18,
    "Name": "Sid Kurien",
    "Organization Name": "EYP",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Strategy & Transaction",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Partner",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "NA",
    "Email ID": "sidkurien@gmail.com",
    "Linkedin": "linkedin.com/in/sid-kurien-23a3326",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-sid-kurien-activity-7310125778082402307-Ii2g?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 19,
    "Name": "Mayank Tiwari",
    "Organization Name": "Accenture Strategy",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Automotive",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Sr. Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 9920833916,
    "Email ID": "mayank.j.tiwari@accenture.com",
    "Linkedin": "linkedin.com/in/mynktiwari",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-mayank-tiwari-activity-7309478529602048000-xwWz?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 20,
    "Name": "Petra M Meiser",
    "Organization Name": "EYP",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Automotive",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Partner",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "NA",
    "Email ID": "petrameiser@yahoo.de",
    "Linkedin": "linkedin.com/in/petra-m-meiser-105925207",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-petra-m-meiser-activity-7306149614078898176-S3TB?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 21,
    "Name": "Neil Cantle",
    "Organization Name": "Market Expertise",
    "Organization Type (Small/ Medium/ Large)": "Medium",
    "Industry": "Consulting",
    "Sub Sector": "Customer Insights & Strategic Market Research",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Vice President - Sales",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "NA",
    "Email ID": "neil@mepune.com",
    "Linkedin": "linkedin.com/in/neil-james-cantle",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-neil-cantle-activity-7305550068797841410-Zspx?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 22,
    "Name": "Yash Aggarwal",
    "Organization Name": "PPI- Public Policy India",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "Public Policy & Social Impact",
    "Sub Sector": "Policy Education, Community Engagement & Capacity Building",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9883655520,
    "Email ID": "yashagarwalm@outlook.com",
    "Linkedin": "linkedin.com/in/yashagarwalm",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-yash-agarwal-activity-7304395366387302400-j6tt?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 23,
    "Name": "Nandini Marwah",
    "Organization Name": "Tech Curators",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "",
    "Sub Sector": "",
    "Type of connect (Founder/ Employee/ Freelancer)": "",
    "Designation": "",
    "Designation Type (Senior/ Mid/ Entry Level)": "",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "https://www.linkedin.com/in/ACoAACWXLnsBBC80Tts6xt2OlcaGKhQOzz3kJ7M?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_recent_activity_content_view%3BETfs1QFGSyiV2JEW9psfiQ%3D%3D",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-founder-of-transcurators-activity-7302579304394108928-IVkp?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 24,
    "Name": "Sparsh Chharba",
    "Organization Name": "SMBC",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Bank",
    "Sub Sector": "Treasury",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Assistant Vice President- Strategic Planning India Division",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "97116 69833",
    "Email ID": "sparsh.chhabra.26@gmail.com",
    "Linkedin": "linkedin.com/in/sparsh-chhabra-a17713123",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-our-very-own-economist-sparsh-activity-7300716383275823104-CODb?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 25,
    "Name": "Ishita Gupta",
    "Organization Name": "Eat Atlás",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "FMCG",
    "Sub Sector": "D2C",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "80763 65478",
    "Email ID": "ishi700gupta@gmail.com",
    "Linkedin": "linkedin.com/in/ishitaguptaaa",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-eat-atlas-activity-7300341311297961984-Lrkp?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 26,
    "Name": "Hazel Siromoni",
    "Organization Name": "Chitkara University",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Education",
    "Sub Sector": "International Education",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Pro Vice Chancellor (International), Chitkara University",
    "Designation Type (Senior/ Mid/ Entry Level)": "",
    "Phone Number": 9811213009,
    "Email ID": "hazel.siromoni@gmail.com",
    "Linkedin": "linkedin.com/in/hazelsiromoni",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-hazel-siromoni-activity-7299986076838834176-agK2?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 27,
    "Name": "Shourya Srivastava",
    "Organization Name": "ICICI Bank",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Bank",
    "Sub Sector": "Large Corporate Lending",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Chief Manager - Corporate Lending",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "83180 05334",
    "Email ID": "Shouryasrivastava21@gmail.com",
    "Linkedin": "https://www.linkedin.com/in/ACoAABdipiIBS1tA7yDje4BLGBodNuau_IEnn3k?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_recent_activity_content_view%3BETfs1QFGSyiV2JEW9psfiQ%3D%3D",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-shourya-srivastava-activity-7299422799712989184-OMzZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 28,
    "Name": "Amit Dutta",
    "Organization Name": "Co-Founder, eKalakaar",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "CreativeTech",
    "Sub Sector": "Cultural Experiences",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Co-Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9717716663,
    "Email ID": "amitdutta2080@gmail.com",
    "Linkedin": "linkedin.com/in/amitdutta2080",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-amit-dutta-co-founder-activity-7298324102828675073-ISXR?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 29,
    "Name": "Prathamesh Karamarkar",
    "Organization Name": "Maeflower  Consulting",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "Consulting",
    "Sub Sector": "International Trade & FDI Advisory",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Associate Director",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9923775763,
    "Email ID": "prathamkarmarkar@gmail.com",
    "Linkedin": "linkedin.com/in/joinpratham",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-prathamesh-karmarkar-activity-7297877994629410816-f0p5?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 30,
    "Name": "Aarushi Chawla",
    "Organization Name": "Nutrify By AC",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "Nutrition",
    "Sub Sector": "Health & Wellness",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "97177 15730",
    "Email ID": "aarushichawla4@gmail.com",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_with-nutritionist-aarushi-chawla-activity-7297534926357176320-N_e1?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 31,
    "Name": "Somnath Chatterjee",
    "Organization Name": "ADL",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Automotive, Aerospace and Industrial",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Senior Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "99403 04533",
    "Email ID": "tublusom@gmail.com",
    "Linkedin": "linkedin.com/in/chatterjeesomnath",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-somnath-chatterjee-activity-7296061228840366080-oT9T?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 32,
    "Name": "Shashank Pareek",
    "Organization Name": "PWC",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Financial Services",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "96190 62943",
    "Email ID": "shashank.v.pareek@gmail.com",
    "Linkedin": "linkedin.com/in/shashank-pareek-b4704b86",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-shashank-pareek-activity-7295351490309738496-08xd?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 33,
    "Name": "Upendra",
    "Organization Name": "Infosys Finacle",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "AI",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Senior Consultant",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "97184 76499",
    "Email ID": "upen.pathak8@gmail.com",
    "Linkedin": "linkedin.com/in/upen963",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-upendra-activity-7294969745253036034-wB8H?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 34,
    "Name": "Rudhira Sharma",
    "Organization Name": "Capgemini Invent",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "CX Transforamtion",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "",
    "Email ID": "rudhirasharma@gmail.com",
    "Linkedin": "linkedin.com/in/rudhira-sharma-6665bb55",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-cx-specialist-activity-7294673125445705728-jj9j?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 35,
    "Name": "Vikrant Patnaik",
    "Organization Name": "Amazon",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Advertisement",
    "Sub Sector": "Advertisement",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 9650337737,
    "Email ID": "patnaik.vikrant1989@gmail.com",
    "Linkedin": "linkedin.com/in/vikrant-patnaik7b13431a",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-vikrant-patnaik-activity-7293472941596442625-Sghb?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 36,
    "Name": "Saksham Soni",
    "Organization Name": "Alpharoute",
    "Organization Type (Small/ Medium/ Large)": "Mid",
    "Industry": "Consulting",
    "Sub Sector": "AI & Data Science",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Data Scientist",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "",
    "Email ID": "saksham9315soni@gmail.com",
    "Linkedin": "linkedin.com/in/saksham-soni",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_saksham-soni-our-very-own-scientist-activity-7292746267225378816-xqSe?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 37,
    "Name": "Kaustubha Panda",
    "Organization Name": "Delloite",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Business Strategy",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Deputy Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 9777928302,
    "Email ID": "kaustubhapanda@gmail.com",
    "Linkedin": "linkedin.com/in/kpanda94",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-kaustubha-panda-activity-7292077096930095104-gICg?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 38,
    "Name": "Sreekar Reddy",
    "Organization Name": "Gradvine",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "Education",
    "Sub Sector": "Education",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "sreekar.reddy52@gmail.com",
    "Linkedin": "linkedin.com/in/sreekarsannapareddy",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-sreekar-sannapareddy-activity-7291737174771650562-06XS?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 39,
    "Name": "Adil Zaidi",
    "Organization Name": "EY",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Public Policy",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Partner",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9810849899,
    "Email ID": "zaidiadil@gmail.com",
    "Linkedin": "linkedin.com/in/zaidiadil",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-adil-zaidi-activity-7291401655223304192-GDz6?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 40,
    "Name": "Neeti Mahajan",
    "Organization Name": "EY",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "ESG",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Consultant",
    "Designation Type (Senior/ Mid/ Entry Level)": "Entry level",
    "Phone Number": "88066 33344",
    "Email ID": "neeti9816@gmail.com",
    "Linkedin": "linkedin.com/in/neeti-mahajan-845446180",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_normalizing-sustainability-activity-7290904124777283585-knzc?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 41,
    "Name": "Saksham Bhalla",
    "Organization Name": "AWS",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "EC2 Commercial Services",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "SDE",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 4154819276,
    "Email ID": "bhallasaksham@gmail.com",
    "Linkedin": "linkedin.com/in/saksham-bhalla",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_conversation-with-bhalla-sahab-activity-7290541749247127552-z7l6?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 42,
    "Name": "Vedika Khatri",
    "Organization Name": "YT/ Instagram",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Content Creator",
    "Sub Sector": "Content creation",
    "Type of connect (Founder/ Employee/ Freelancer)": "Freelancer",
    "Designation": "Content Creator",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "vedskibaatein@gmail.com",
    "Linkedin": "linkedin.com/in/vedikakhatri",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_kabhi-25-kabhi-35-but-mostly-15-activity-7290191994516029441-s24o?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 43,
    "Name": "Prasham Vir Sarmah",
    "Organization Name": "",
    "Organization Type (Small/ Medium/ Large)": "",
    "Industry": "",
    "Sub Sector": "",
    "Type of connect (Founder/ Employee/ Freelancer)": "",
    "Designation": "",
    "Designation Type (Senior/ Mid/ Entry Level)": "",
    "Phone Number": "",
    "Email ID": "prasham.sarmah@gmail.com",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_gurgaon-to-saudi-to-london-activity-7289859802644574208-q9qf?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 44,
    "Name": "Mukesh Kumar",
    "Organization Name": "IIM Amritsar",
    "Organization Type (Small/ Medium/ Large)": "Medium",
    "Industry": "Professor",
    "Sub Sector": "Soft skills",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Professor",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_jnu-to-iim-activity-7289477232572436480-i0Pu?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 45,
    "Name": "Jatin Vidhani",
    "Organization Name": "Grand Thorton",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Public Policy",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Director",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-jatin-vidhani-activity-7289224493485498368-Kp_Z?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 46,
    "Name": "Garv Malik",
    "Organization Name": "Slice",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Finance",
    "Sub Sector": "Finance",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Chief Meme Office",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_mauj-masti-activity-7288904676257714176-UL2Z?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 47,
    "Name": "Amit Vatsayan",
    "Organization Name": "EY",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Public Policy",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Partner",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_a-journey-of-impactful-change-activity-7288405158999343105-xRKs?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 48,
    "Name": "Abhishek Sharma",
    "Organization Name": "Bosch",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Sales",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Chief of Staff",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_jammu-to-japan-activity-7288060306851872769-WFzi?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 49,
    "Name": "Leandro Dyslva",
    "Organization Name": "Miller Wymann",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Learning & Development",
    "Sub Sector": "Skill",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_action-is-the-only-truth-activity-7287318812306153472-A9Hi?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 50,
    "Name": "Samyak Jain",
    "Organization Name": "A Plus Charge",
    "Organization Type (Small/ Medium/ Large)": "small",
    "Industry": "Automotive",
    "Sub Sector": "EV",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_ev-boy-connecting-india-with-ev-infrastructure-activity-7286966086258827267-A51v?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 51,
    "Name": "Ansh Agrawal",
    "Organization Name": "Ansh Agarwal",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "Consulting",
    "Sub Sector": "Data Analysis Performance Improvement",
    "Type of connect (Founder/ Employee/ Freelancer)": "Freelancer",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_9-am-5-pm-to-freelancing-product-analytics-activity-7285606246844379136-D45G?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 52,
    "Name": "Kshitij Goel",
    "Organization Name": "",
    "Organization Type (Small/ Medium/ Large)": "",
    "Industry": "",
    "Sub Sector": "",
    "Type of connect (Founder/ Employee/ Freelancer)": "",
    "Designation": "",
    "Designation Type (Senior/ Mid/ Entry Level)": "",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_entrepreneur-banne-ke-liye-spelling-nahi-activity-7285281607488270337-5bhG?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 53,
    "Name": "Hemal N Thakkar",
    "Organization Name": "Crisil",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Automotive",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Director",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-hemal-n-thakkar-activity-7284782504337649664-95WO?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 54,
    "Name": "Gajendra Kothari",
    "Organization Name": "Etica Wealth",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Finance",
    "Sub Sector": "Wealth Management",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_learned-valuable-lessons-from-gajendra-kothari-activity-7283849994791526401-8BXe?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 55,
    "Name": "Utkarsh Bajaj",
    "Organization Name": "Amazon",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Data Analysis Performance Improvement",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Business Intellegence Engineer",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_bridging-15-years-activity-7283100327283671040-gsQl?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 56,
    "Name": "Akarsh Verma",
    "Organization Name": "Aditya Birla Capital",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Finance",
    "Sub Sector": "Wealth Management",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Channel Manager - Organized Wealth",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_re-network-with-akarsh-activity-7282401411621888000-gun6?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 57,
    "Name": "Anuj Singh",
    "Organization Name": "Accenture Strategy",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Automotive",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Analyst",
    "Designation Type (Senior/ Mid/ Entry Level)": "Entry level",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_bahua-to-tokyo-activity-7282087937775677442-aZq0?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 58,
    "Name": "Akshit Goel",
    "Organization Name": "",
    "Organization Type (Small/ Medium/ Large)": "",
    "Industry": "",
    "Sub Sector": "",
    "Type of connect (Founder/ Employee/ Freelancer)": "",
    "Designation": "",
    "Designation Type (Senior/ Mid/ Entry Level)": "",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_6-of-365-the-365-circle-expanding-horizons-activity-7281225942356606976-P3xU?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 59,
    "Name": "Amulya Aggarwal",
    "Organization Name": "JP Morgan & Chase",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Finance",
    "Sub Sector": "Risk",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Analyst",
    "Designation Type (Senior/ Mid/ Entry Level)": "Entry level",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_the365circle-financialdiscipline-careergrowth-activity-7280516031867985921-lH6V?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 60,
    "Name": "Sushma Nayak",
    "Organization Name": "Symbioisis International University",
    "Organization Type (Small/ Medium/ Large)": "Medium",
    "Industry": "Education",
    "Sub Sector": "BFSI",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Proffessor",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_the365circle-mindfulness-lifelonglearning-activity-7279392640108769280-aESr?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 61,
    "Name": "Vishnu Das Gupta",
    "Organization Name": "EY",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Economics",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Deputy Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_economics-indiagrowthstory-economicpolicy-activity-7278409790387625984-Ky81?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 62,
    "Name": "Mohan Kapur",
    "Organization Name": "Leadership Management Institute",
    "Organization Type (Small/ Medium/ Large)": "Medium",
    "Industry": "Learning & Development",
    "Sub Sector": "Skill",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Partner",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_negativecapability-businesstransformation-activity-7277035847583997952-5bjK?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 63,
    "Name": "Zakkaullah Bader",
    "Organization Name": "PWC",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Public Policy",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Consultant",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_realestate-india-careergrowth-activity-7276268922629173248-j6zF?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 64,
    "Name": "Arunesh Ramesh Raja",
    "Organization Name": "Smartan",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "Health and Wellness",
    "Sub Sector": "Fitness Technology",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder & CEO",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "arunesh@smartan.ai",
    "Linkedin": "linkedin.com/in/arunesh-ramesh-raja-8628ba137",
    "Featured": "Yes",
    "": ""
  },
  {
    "S. No.": 65,
    "Name": "Riya Dimani",
    "Organization Name": "",
    "Organization Type (Small/ Medium/ Large)": "",
    "Industry": "",
    "Sub Sector": "",
    "Type of connect (Founder/ Employee/ Freelancer)": "",
    "Designation": "",
    "Designation Type (Senior/ Mid/ Entry Level)": "",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 66,
    "Name": "Akarsh Sharma",
    "Organization Name": "",
    "Organization Type (Small/ Medium/ Large)": "",
    "Industry": "",
    "Sub Sector": "",
    "Type of connect (Founder/ Employee/ Freelancer)": "",
    "Designation": "",
    "Designation Type (Senior/ Mid/ Entry Level)": "",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 67,
    "Name": "Nikhil Gaur",
    "Organization Name": "Hive Business School",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "Education",
    "Sub Sector": "Sales",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-nikhil-gaur-founder-activity-7339545963100872704-CCC8?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 68,
    "Name": "Rohan",
    "Organization Name": "",
    "Organization Type (Small/ Medium/ Large)": "",
    "Industry": "",
    "Sub Sector": "",
    "Type of connect (Founder/ Employee/ Freelancer)": "",
    "Designation": "",
    "Designation Type (Senior/ Mid/ Entry Level)": "",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 69,
    "Name": "Deepak Motwani",
    "Organization Name": "Acquity Knowladge Partners",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Finance",
    "Sub Sector": "M&A",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Delivery Lead",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 8983808951,
    "Email ID": "deepakmotwani.95@gmail.com",
    "Linkedin": "linkedin.com/in/deepak-motwani-95d",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 70,
    "Name": "Mayank Garg",
    "Organization Name": "Vivo India",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Technology",
    "Sub Sector": "Strategy",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 71,
    "Name": "Prashant Garg",
    "Organization Name": "EY",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "AI & DATA",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Partner",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 72,
    "Name": "Rohit Kapur",
    "Organization Name": "The Jet Company",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Aviation",
    "Sub Sector": "Broker",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Partner",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "https://www.linkedin.com/in/ACoAAAfKYRYBdUj_WyjPkoCI9bHmpHbxYT-VDDg?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_recent_activity_content_view%3BETfs1QFGSyiV2JEW9psfiQ%3D%3D",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-rohit-kapur-activity-7342393402438623233-v8Zd?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 73,
    "Name": "Wiggert",
    "Organization Name": "United Brewries",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "FMCG",
    "Sub Sector": "Alchohol Bev",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Chief Supply Chain Officer",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 74,
    "Name": "Parth Handa",
    "Organization Name": "Bain & Company",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "AMI",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "+91 96505 09282",
    "Email ID": "parthhanda82@gmail.com",
    "Linkedin": "linkedin.com/in/parth-handa-175331126",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 75,
    "Name": "Shalabh Rajvanshi",
    "Organization Name": "Cholamandalam",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Finance",
    "Sub Sector": "Automotive Leasing & Finance",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "AVP",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 9130058785,
    "Email ID": "rajvanshi.shalabh@gmail.com",
    "Linkedin": "linkedin.com/in/shalabhr",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 76,
    "Name": "Parag Parmar",
    "Organization Name": "Hindalco Industries",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Industrial",
    "Sub Sector": "Metals",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Digital CX Head",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "+91 97780 19227",
    "Email ID": "parag.426@gmail.com",
    "Linkedin": "linkedin.com/in/paragparmar",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-parag-parmar-activity-7347825436548075520-YlyK?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 77,
    "Name": "Apoorv Arora",
    "Organization Name": "Blinkit",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Food Tech",
    "Sub Sector": "Operations",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Sr. Engineering Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "+91 84477 53585",
    "Email ID": "apoorv.arora@zomato.com",
    "Linkedin": "linkedin.com/in/apoorv-arora",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 78,
    "Name": "Gurudas Nulkar",
    "Organization Name": "Gokhle Insitiute of Politics & Economics",
    "Organization Type (Small/ Medium/ Large)": "Mid",
    "Industry": "Education",
    "Sub Sector": "Sustainablity",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Director/ Dean",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "98 22 03 45 79",
    "Email ID": "gurudasn@gmail.com",
    "Linkedin": "linkedin.com/in/gurudasn",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 79,
    "Name": "Jayesh Manmode",
    "Organization Name": "Hero motocorp",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Automotive",
    "Sub Sector": "Product Planning",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Global Product Planning Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 9962086862,
    "Email ID": "jayesh.manmode02@gmail.com",
    "Linkedin": "linkedin.com/in/jayesh-manmode",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 80,
    "Name": "Sandeep Ranade",
    "Organization Name": "Hansa Research Group",
    "Organization Type (Small/ Medium/ Large)": "Mid",
    "Industry": "Research",
    "Sub Sector": "Quant Research",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Executive Vice President",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9820784975,
    "Email ID": "ranadesand@gmail.com",
    "Linkedin": "linkedin.com/in/sandeep-ranade-a638b29",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 81,
    "Name": "Sayantan Bose",
    "Organization Name": "EY",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Digital & Global Alliances",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Director & Leader",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9818880941,
    "Email ID": "sayantan.bose77@gmail.com",
    "Linkedin": "linkedin.com/in/sayantan-bose-8967b817",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 82,
    "Name": "Nikhil Sachdev",
    "Organization Name": "Research firm- Stealth Mode | Ex- Accentrue Strategy",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "Consulting",
    "Sub Sector": "FMCG/ D2C Concept and product testing",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9619386908,
    "Email ID": "nikhil.sach33@gmail.com",
    "Linkedin": "linkedin.com/in/nikhil-sachdeva92",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 83,
    "Name": "Sriram EYP",
    "Organization Name": "EYP",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "M&A - Strategy & Transactions",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Director",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9818999440,
    "Email ID": "sriramdh@gmail.com",
    "Linkedin": "linkedin.com/in/sriramdh",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-sriram-dharamrajan-activity-7348188218283933698-XYEd?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 84,
    "Name": "Vinkesh Gulati",
    "Organization Name": "FADA",
    "Organization Type (Small/ Medium/ Large)": "Medium",
    "Industry": "Automotive",
    "Sub Sector": "Dealers Association",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Executive Committee member",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9335655555,
    "Email ID": "vinkesh@united.ac.in",
    "Linkedin": "linkedin.com/in/vinkesh-gulati-b3024824",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 85,
    "Name": "Vikas Prasad",
    "Organization Name": "Webasto Group",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Automotive",
    "Sub Sector": "Manufacturing",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "President & Managing Director",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "prasad.vikas@gmail.com",
    "Linkedin": "linkedin.com/in/dr-vikas-prasad",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 86,
    "Name": "Amarpal Singh Chadha",
    "Organization Name": "EY",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Automotive",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Partner",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "amarpal.chadha@in.ey.com",
    "Linkedin": "linkedin.com/in/amarpal-singh-chadha-b200241",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 87,
    "Name": "Naman Kamra",
    "Organization Name": "Jet Set Jobs",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "Consulting",
    "Sub Sector": "Education",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "naman@jetsetjobs.in",
    "Linkedin": "linkedin.com/in/naman-kamra-666963111",
    "Featured": "yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-naman-kamra-activity-7347463052897734656-p5NQ?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 88,
    "Name": "Harsimran Singh",
    "Organization Name": "Hero MotoCorp",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Automotive",
    "Sub Sector": "CAD",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Channel Appointment & Dealer Development",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 7696225807,
    "Email ID": "harshi8991@gmail.com",
    "Linkedin": "linkedin.com/in/harsimran-singh-37150691",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 89,
    "Name": "Deepika Kukreti",
    "Organization Name": "LG Electronics",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Electrionics",
    "Sub Sector": "Communications & Brand",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "DGM - Communications",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 9873426369,
    "Email ID": "deepikakukreti@gmail.com",
    "Linkedin": "linkedin.com/in/deepika-kukreti-453bb93",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-deepika-kukreti-activity-7348550218868510720-k4mc?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 90,
    "Name": "Sahil Athar",
    "Organization Name": "Hyundai",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Automotive",
    "Sub Sector": "Strategy",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Business Strategy",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 7986488939,
    "Email ID": "sahil.athar098@gmail.com",
    "Linkedin": "linkedin.com/in/sahilathar",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 91,
    "Name": "Aftab Syed",
    "Organization Name": "",
    "Organization Type (Small/ Medium/ Large)": "",
    "Industry": "",
    "Sub Sector": "",
    "Type of connect (Founder/ Employee/ Freelancer)": "",
    "Designation": "",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9867389424,
    "Email ID": "aftab.syed@gmail.com",
    "Linkedin": "linkedin.com/in/aftabsyed",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 92,
    "Name": "Sanchita J",
    "Organization Name": "",
    "Organization Type (Small/ Medium/ Large)": "",
    "Industry": "",
    "Sub Sector": "",
    "Type of connect (Founder/ Employee/ Freelancer)": "",
    "Designation": "",
    "Designation Type (Senior/ Mid/ Entry Level)": "",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 93,
    "Name": "Vipra Garg",
    "Organization Name": "",
    "Organization Type (Small/ Medium/ Large)": "",
    "Industry": "",
    "Sub Sector": "",
    "Type of connect (Founder/ Employee/ Freelancer)": "",
    "Designation": "",
    "Designation Type (Senior/ Mid/ Entry Level)": "",
    "Phone Number": "",
    "Email ID": "",
    "Linkedin": "",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 94,
    "Name": "Uma Raghavana",
    "Organization Name": "Fractional Marketing",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "Marketing",
    "Sub Sector": "Marketing",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder, CMO",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9566017695,
    "Email ID": "fractionalconsultings@gmail.com",
    "Linkedin": "linkedin.com/in/uma-raghavan-4ba63539",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 95,
    "Name": "Prateek Jain",
    "Organization Name": "EYP",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "AMI",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Assitent Director",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 16463726087,
    "Email ID": "prateek.p89@gmail.com",
    "Linkedin": "linkedin.com/in/prateek-jain-cfa-1250752a",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-prateek-jain-activity-7347105652164476928-Wknz?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  },
  {
    "S. No.": 96,
    "Name": "Mihiir Rungta",
    "Organization Name": "Stealth Mode",
    "Organization Type (Small/ Medium/ Large)": "Samagra",
    "Industry": "NA",
    "Sub Sector": "NA",
    "Type of connect (Founder/ Employee/ Freelancer)": "Founder",
    "Designation": "Founder",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 8860819708,
    "Email ID": "mihiirrungta@gmail.com",
    "Linkedin": "linkedin.com/in/mihiirrungta",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 97,
    "Name": "Akshaan Sehgal",
    "Organization Name": "Tiger Analytics",
    "Organization Type (Small/ Medium/ Large)": "Medium",
    "Industry": "Advance Analytics",
    "Sub Sector": "Analytics",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Senior Consultant",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": 9711559331,
    "Email ID": "avisehgal98@gmail.com",
    "Linkedin": "linkedin.com/in/akshaan-sehgal",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 98,
    "Name": "Mairu Jain",
    "Organization Name": "Bain & Co.",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Consulting",
    "Sub Sector": "Consulting",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Senior Consultant",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "",
    "Email ID": "jainmairu19@gmail.com",
    "Linkedin": "linkedin.com/in/mairu-jain",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 99,
    "Name": "Akshat Kharbanda",
    "Organization Name": "Novo Nordisk",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Marketing",
    "Sub Sector": "Marketing",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Brand Marketing Manager",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": 918468909258,
    "Email ID": "htkb@novonordisk.com",
    "Linkedin": "linkedin.com/in/akshat-kharbanda",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 100,
    "Name": "Pranjal Parihar",
    "Organization Name": "Kotak Mahindra Bank",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Banking",
    "Sub Sector": "Corporate Lending",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Deputy VP",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "92058 92324",
    "Email ID": "pranjal.parihar@kotak.com",
    "Linkedin": "linkedin.com/in/pranjalparihar",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 101,
    "Name": "Aditi Pai",
    "Organization Name": "Transasia India",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Pharmacy",
    "Sub Sector": "Financial Control",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "CFO",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "",
    "Email ID": "adipai2001@gmail.com",
    "Linkedin": "linkedin.com/in/aditi-pai-67383281",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 102,
    "Name": "Garima Tayagi",
    "Organization Name": "MyMuse",
    "Organization Type (Small/ Medium/ Large)": "Small",
    "Industry": "Sexual Wellness",
    "Sub Sector": "Sexual Wellness",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Business Head",
    "Designation Type (Senior/ Mid/ Entry Level)": "Mid",
    "Phone Number": "",
    "Email ID": "garimatyagi268@gmail.com",
    "Linkedin": "linkedin.com/in/garimatyagi",
    "Featured": "No",
    "": ""
  },
  {
    "S. No.": 103,
    "Name": "Sandhya Biswas",
    "Organization Name": "Livguard",
    "Organization Type (Small/ Medium/ Large)": "Large",
    "Industry": "Electircal",
    "Sub Sector": "Battery/ Inverter",
    "Type of connect (Founder/ Employee/ Freelancer)": "Employee",
    "Designation": "Markeing Head",
    "Designation Type (Senior/ Mid/ Entry Level)": "Senior",
    "Phone Number": "99711 20168",
    "Email ID": "sandhya.babu@gmail.com",
    "Linkedin": "linkedin.com/in/sandhya-biswas-4756592",
    "Featured": "Yes",
    "": "https://www.linkedin.com/posts/anish-malhotra-21282492_in-conversation-with-sandhya-biswas-activity-7348908830514139160-fmFt?utm_source=share&utm_medium=member_desktop&rcm=ACoAABOy_i4BultDRLWhgVYa68DYIJsO8IW9eyI"
  }
];

// Get top 6 most common industries for filtering
const industryCounts = connectionsData.reduce((acc, curr) => {
  const ind = curr["Industry"] || "Other";
  acc[ind] = (acc[ind] || 0) + 1;
  return acc;
}, {} as Record<string, number>);
const sortedIndustries = Object.entries(industryCounts)
  .sort((a, b) => b[1] - a[1])
  .map(([ind]) => ind)
  .filter((ind) => ind && ind !== "-" && ind !== "Other");
const topIndustries = sortedIndustries.slice(0, 6);
const filterOptions = ["All", ...topIndustries];

const CARDS_PER_PAGE = 8;

const Connections = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);

  const filteredConnections =
    selectedIndustry === "All"
      ? connectionsData
      : connectionsData.filter((p) => p["Industry"] === selectedIndustry);

  // Pagination logic
  const totalPages = Math.ceil(filteredConnections.length / CARDS_PER_PAGE);
  const paginatedConnections = filteredConnections.slice(
    (page - 1) * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE
  );

  // Reset to page 1 if filter changes
  React.useEffect(() => {
    setPage(1);
  }, [selectedIndustry]);

  // Use hero.png for every card's hover image
  const imageUrl = "/hero.png";

  return (
    <section id="connections" className="py-20 md:py-32 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#22306e]">
            Connections Across Industry
          </h2>
          <p className="text-lg text-[#22306e] mt-4 max-w-xl mx-auto font-medium">
            Discover professionals from various fields.
          </p>
        </div>

        {/* Filtering Dropdown */}
        <div className="flex justify-end mb-12 relative">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-xl border border-[#405ff4] bg-white text-[#405ff4] hover:bg-blue-50 shadow transition-all min-w-[200px] justify-between focus:outline-none focus:ring-2 focus:ring-[#405ff4]",
                dropdownOpen && "ring-2 ring-[#405ff4]"
              )}
            >
              <span>Filter: <span className="font-bold text-[#405ff4]">{selectedIndustry}</span></span>
              <ChevronDown className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>
            {dropdownOpen && (
              <div className="absolute top-14 right-0 w-56 bg-white rounded-xl shadow-lg z-50 overflow-hidden border border-[#405ff4] animate-fade-in">
                {filterOptions.map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setSelectedIndustry(type);
                      setDropdownOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-5 py-3 text-base transition-colors focus:outline-none",
                      selectedIndustry === type
                        ? "bg-[#405ff4] text-white font-bold"
                        : "hover:bg-blue-50 text-[#405ff4]"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {paginatedConnections.map((prof, index) => (
            <div
              key={index}
              className={cn(
                "group relative h-[390px] w-full max-w-[340px] mx-auto flex flex-col justify-between items-center bg-white rounded-3xl shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
              )}
            >
              {/* Card Content (hidden on hover) */}
              <div className="absolute inset-0 flex flex-col justify-between items-center p-8 text-center transition-opacity duration-300 group-hover:opacity-0 z-10">
                <span className="block mb-2 text-xs font-semibold tracking-widest text-[#405ff4] uppercase">
                  {prof["Industry"] || "-"}
                </span>
                <h3 className="text-2xl font-extrabold text-[#22306e] mb-2 leading-tight">
                  {prof["Name"]}
                </h3>
                <div className="flex flex-col gap-1 w-full items-center mb-3">
                  <span className="text-lg font-bold text-[#405ff4]">
                    {prof["Designation"]}
                    {prof["Designation Type (Senior/ Mid/ Entry Level)"] && (
                      <span className="ml-1 text-base font-semibold text-[#405ff4]">
                        ({prof["Designation Type (Senior/ Mid/ Entry Level)"]})
                      </span>
                    )}
                  </span>
                  <span className="text-base text-[#22306e] font-medium">
                    {prof["Organization Name"]}
                    {prof["Organization Type (Small/ Medium/ Large)"] && (
                      <span className="ml-1 text-[#405ff4] text-sm">
                        ({prof["Organization Type (Small/ Medium/ Large)"]})
                      </span>
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-4 mt-2">
                  {prof["Email ID"] && (
                    <a
                      href={`mailto:${prof["Email ID"].split(" / ")[0]}`}
                      className="text-[#405ff4] hover:text-[#22306e] text-xl p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition"
                      title="Send Email"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  )}
                  {prof["Linkedin"] && (
                    <a
                      href={prof["Linkedin"].startsWith("http") ? prof["Linkedin"] : `https://${prof["Linkedin"]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#405ff4] hover:text-[#22306e] text-xl p-2 rounded-full bg-blue-50 hover:bg-blue-100 transition"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {prof[""] && (
                    <a
                      href={prof[""]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#405ff4] hover:text-[#22306e] text-xs font-semibold"
                      style={{ textDecoration: "none" }}
                    >
                      Featured Post
                    </a>
                  )}
                </div>
              </div>
              {/* Hover Image/Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end items-center transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-20">
                <Image
                  src={imageUrl}
                  alt={prof["Name"]}
                  fill
                  className="object-cover group-hover:opacity-60 transition-opacity duration-300"
                  priority={index < 4}
                />
                {/* Darker gradient overlay */}
                <div className="absolute inset-0 pointer-events-none" style={{background: "linear-gradient(180deg, rgba(20,30,60,0) 0%, rgba(20,30,60,0.85) 100%)"}} />
                <div className="w-full pb-8 pt-16 flex flex-col items-center justify-end absolute bottom-0 left-0">
                  <h3 className="text-xl font-extrabold text-white mb-1 text-center drop-shadow-lg">
                    {prof["Name"]}
                  </h3>
                  <p className="text-base font-semibold text-white text-center drop-shadow-lg mb-4">
                    {prof["Type of connect (Founder/ Employee/ Freelancer)"]}
                  </p>
                  <div className="flex items-center justify-center gap-6 mt-2">
                    {prof["Email ID"] && (
                      <a
                        href={`mailto:${prof["Email ID"].split(" / ")[0]}`}
                        className="text-white hover:text-blue-200 text-xl p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        title="Send Email"
                      >
                        <Mail className="w-5 h-5" />
                      </a>
                    )}
                    {prof["Linkedin"] && (
                      <a
                        href={prof["Linkedin"].startsWith("http") ? prof["Linkedin"] : `https://${prof["Linkedin"]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-200 text-xl p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {prof[""] && (
                      <a
                        href={prof[""]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-200 text-xs font-semibold"
                        style={{ textDecoration: "none" }}
                      >
                        Featured Post
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="rounded-xl px-4 py-2 bg-[#22306e] text-white disabled:opacity-40 disabled:cursor-not-allowed shadow font-semibold text-base transition-all hover:bg-[#405ff4] focus:outline-none focus:ring-2 focus:ring-[#22306e]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-bold text-[#22306e] text-lg">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="rounded-xl px-4 py-2 bg-[#22306e] text-white disabled:opacity-40 disabled:cursor-not-allowed shadow font-semibold text-base transition-all hover:bg-[#405ff4] focus:outline-none focus:ring-2 focus:ring-[#22306e]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Connections;
