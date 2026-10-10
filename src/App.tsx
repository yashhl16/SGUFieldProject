import { FormEvent, ReactNode, useMemo, useState } from "react";

type Page = "home" | "events" | "details" | "register" | "dashboard" | "admin" | "about" | "auth";
type IconName = "arrow" | "calendar" | "check" | "chevron" | "clock" | "close" | "eye" | "filter" | "home" | "location" | "mail" | "menu" | "people" | "search" | "share" | "spark" | "ticket" | "trash" | "user";

const photos = {
  hero: "https://images.unsplash.com/photo-1784775638410-9fa0012aef2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1400",
  hackathon: "https://images.unsplash.com/photo-1782388716252-d598f84ea62f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1000",
  culture: "https://images.unsplash.com/photo-1781583716707-26ec9170ca0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1000",
  sports: "https://images.unsplash.com/photo-1687709645969-0fb890c168c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1000",
  workshop: "https://images.unsplash.com/photo-1781583847268-46d15bfe5609?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1000",
  seminar: "https://images.unsplash.com/photo-1782388713336-fcb8aa6db8f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=85&w=1000",
};

const events = [
  { id: 1, title: "CodeStorm 2025 Hackathon", category: "Technical", date: "24 May", time: "9:00 AM", venue: "Innovation Hub", image: photos.hackathon, seats: 18, status: "Filling fast", color: "violet" },
  { id: 2, title: "Aurora Annual Cultural Fest", category: "Cultural", date: "29 May", time: "4:30 PM", venue: "Main Auditorium", image: photos.culture, seats: 124, status: "Open", color: "pink" },
  { id: 3, title: "Inter-College Sports Meet", category: "Sports", date: "02 Jun", time: "7:00 AM", venue: "University Arena", image: photos.sports, seats: 46, status: "Open", color: "blue" },
  { id: 4, title: "Visual Stories: Photography", category: "Workshops", date: "06 Jun", time: "11:00 AM", venue: "Media Lab", image: photos.workshop, seats: 8, status: "Almost full", color: "amber" },
  { id: 5, title: "Future of AI Seminar", category: "Seminars", date: "12 Jun", time: "2:00 PM", venue: "Seminar Hall B", image: photos.seminar, seats: 72, status: "Open", color: "cyan" },
  { id: 6, title: "Campus Unplugged Night", category: "Music", date: "14 Jun", time: "6:30 PM", venue: "Open Air Theatre", image: photos.hero, seats: 91, status: "Open", color: "indigo" },
];

const navItems: { label: string; page: Page }[] = [
  { label: "Home", page: "home" },
  { label: "Events", page: "events" },
  { label: "Categories", page: "events" },
  { label: "About Us", page: "about" },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    eye: <><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
    filter: <path d="M4 6h16M7 12h10M10 18h4" />,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v10h14V10M9 20v-6h6v6" /></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    people: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    share: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 10.5 6.8-4M8.6 13.5l6.8 4" /></>,
    spark: <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3ZM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" />,
    ticket: <path d="M3 8a2 2 0 0 0 0 4v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0 0-4V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2Z" />,
    trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  };
  return <svg aria-hidden="true" className="icon" fill="none" height={size} viewBox="0 0 24 24" width={size}>{paths[name]}</svg>;
}

function Button({ children, variant = "primary", icon, onClick, type = "button", className = "" }: { children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; icon?: IconName; onClick?: () => void; type?: "button" | "submit"; className?: string }) {
  return <button className={`btn btn-${variant} ${className}`} onClick={onClick} type={type}>{children}{icon && <Icon name={icon} size={17} />}</button>;
}

function Logo({ light = false }: { light?: boolean }) {
  return <div className={`logo ${light ? "logo-light" : ""}`}><span className="logo-mark"><Icon name="spark" size={19} /></span><span>CEMS<span>.</span></span></div>;
}

function Header({ page, go }: { page: Page; go: (p: Page) => void }) {
  const [open, setOpen] = useState(false);
  return <header className="header"><div className="nav-shell">
    <button aria-label="Go home" className="logo-button" onClick={() => go("home")}><Logo /></button>
    <nav className={open ? "nav-links open" : "nav-links"}>
      {navItems.map((item) => <button className={(page === item.page || (item.label === "Categories" && page === "events")) ? "nav-active" : ""} key={item.label} onClick={() => { go(item.page); setOpen(false); }}>{item.label}</button>)}
      <div className="mobile-auth"><Button variant="ghost" onClick={() => go("auth")}>Log in</Button><Button onClick={() => go("auth")}>Sign up</Button></div>
    </nav>
    <div className="nav-actions"><Button variant="ghost" onClick={() => go("auth")}>Log in</Button><Button onClick={() => go("auth")}>Sign up</Button></div>
    <button aria-label="Toggle menu" className="menu-button" onClick={() => setOpen(!open)}><Icon name={open ? "close" : "menu"} /></button>
  </div></header>;
}

function SearchBox({ value, setValue, onExplore }: { value: string; setValue: (v: string) => void; onExplore?: () => void }) {
  return <div className="search-box"><Icon name="search" size={21} /><input aria-label="Search events" onChange={(e) => setValue(e.target.value)} placeholder="Search events, categories or locations..." value={value} />{onExplore && <Button onClick={onExplore}>Search events</Button>}</div>;
}

function EventCard({ event, go, compact = false }: { event: typeof events[number]; go: (p: Page) => void; compact?: boolean }) {
  return <article className={`event-card ${compact ? "compact" : ""}`}>
    <div className="event-image"><img alt={`${event.title} event`} src={event.image} /><span className={`tag tag-${event.color}`}>{event.category}</span><span className="save">♡</span></div>
    <div className="event-body"><div className="event-date"><strong>{event.date.split(" ")[0]}</strong><span>{event.date.split(" ")[1]}</span></div>
      <div className="event-copy"><h3>{event.title}</h3><p><Icon name="clock" size={15} /> {event.time} <span>•</span> <Icon name="location" size={15} /> {event.venue}</p></div>
    </div>
    <div className="event-footer"><span className={event.seats < 20 ? "low-seats" : ""}>{event.seats} seats left</span><button onClick={() => go("details")}>View details <Icon name="arrow" size={15} /></button></div>
  </article>;
}

function SectionTitle({ eyebrow, title, text, action }: { eyebrow?: string; title: string; text?: string; action?: ReactNode }) {
  return <div className="section-title"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{text && <p>{text}</p>}</div>{action}</div>;
}

function Footer({ go }: { go: (p: Page) => void }) {
  return <footer><div className="footer-grid"><div><Logo light /><p>Your campus, your community, your moments. Discover experiences that make college unforgettable.</p><div className="socials"><span>in</span><span>f</span><span>ig</span><span>x</span></div></div>
    <div><h4>Explore</h4><button onClick={() => go("events")}>Browse events</button><button onClick={() => go("events")}>Categories</button><button onClick={() => go("about")}>About us</button></div>
    <div><h4>For students</h4><button onClick={() => go("dashboard")}>My dashboard</button><button onClick={() => go("register")}>Registration</button><button>Help center</button></div>
    <div><h4>Stay connected</h4><p><Icon name="mail" size={17} /> hello@cems.edu</p><p><Icon name="location" size={17} /> North Campus, University Road</p></div>
  </div><div className="footer-bottom"><span>© 2025 College Event Management System.</span><span>Privacy · Terms · Accessibility</span></div></footer>;
}

function Home({ go }: { go: (p: Page) => void }) {
  const [search, setSearch] = useState("");
  const categories = [
    ["</>", "Technical", "24 events"], ["✦", "Cultural", "18 events"], ["◉", "Sports", "12 events"],
    ["⌁", "Workshops", "16 events"], ["♫", "Music", "9 events"], ["▤", "Seminars", "11 events"],
  ];
  return <><main>
    <section className="hero"><div className="hero-orb orb-one" /><div className="hero-orb orb-two" /><div className="hero-grid container">
      <div className="hero-copy"><span className="pill"><span>●</span> One connected campus.</span><h1>Manage college<br /><em>events smarter.</em></h1><p>One platform to discover events, simplify registrations, track attendance, and connect your campus community.</p>
        <div className="hero-actions"><Button icon="arrow" onClick={() => go("events")}>Explore events</Button><Button variant="secondary" onClick={() => go("admin")}>Create an event</Button></div>
        <div className="hero-people"><div className="avatars"><span>AM</span><span>RK</span><span>JS</span><span>+2k</span></div><p><strong>2,400+ students</strong><br />already connected</p></div>
      </div>
      <div className="hero-visual"><div className="photo-main"><img alt="Students enjoying campus life" src={photos.hero} /><div className="photo-label"><span className="live-dot" /> Happening this week <strong>12 events</strong></div></div>
        <div className="floating-card float-top"><span className="mini-icon">⌁</span><div><small>Trending now</small><strong>CodeStorm 2025</strong><span>168 students joined</span></div></div>
        <div className="floating-card float-bottom"><span className="mini-date"><strong>29</strong>MAY</span><div><small>Coming up</small><strong>Aurora Cultural Fest</strong><span>Main Auditorium</span></div></div>
      </div>
      <div className="hero-search"><SearchBox onExplore={() => go("events")} setValue={setSearch} value={search} /></div>
    </div></section>

    <section className="section container"><SectionTitle action={<Button icon="arrow" variant="ghost" onClick={() => go("events")}>View all events</Button>} eyebrow="HAPPENING ON CAMPUS" title="Events you won't want to miss" text="Handpicked experiences, created by your campus community." />
      <div className="events-grid">{events.slice(0, 3).map((event) => <EventCard event={event} go={go} key={event.id} />)}</div>
    </section>

    <section className="category-section"><div className="container"><SectionTitle eyebrow="FIND YOUR VIBE" title="Explore by category" text="Whatever you're into, there's something happening for you." /><div className="category-grid">{categories.map(([icon, name, count], i) => <button className={`category-card cat-${i}`} key={name} onClick={() => go("events")}><span>{icon}</span><strong>{name}</strong><small>{count}</small><Icon name="chevron" size={18} /></button>)}</div></div></section>

    <section className="stats container"><div><strong>120<span>+</span></strong><p>Events this semester</p></div><div><strong>2.4<span>k</span></strong><p>Active students</p></div><div><strong>38</strong><p>Campus clubs</p></div><div><strong>94<span>%</span></strong><p>Student satisfaction</p></div></section>

    <section className="stories section"><div className="container"><SectionTitle eyebrow="STUDENT STORIES" title="Made for students, loved by students" />
      <div className="quote-grid"><blockquote><div className="stars">★★★★★</div><p>“CEMS made my first semester so much better. I found a design workshop, met my closest friends, and now I never miss an event.”</p><footer><span className="avatar purple">AS</span><div><strong>Ananya Sharma</strong><small>Computer Science, Year 2</small></div></footer></blockquote>
      <blockquote><div className="stars">★★★★★</div><p>“Managing registrations for our tech club used to be chaos. Now everything is organized, visible, and genuinely simple.”</p><footer><span className="avatar blue">RV</span><div><strong>Rohan Verma</strong><small>Tech Club President</small></div></footer></blockquote></div>
    </div></section>
    <section className="cta container"><div><span className="eyebrow light">YOUR NEXT MEMORY STARTS HERE</span><h2>Ready to join the campus buzz?</h2><p>Discover your people, pursue your passions, and make every semester count.</p></div><Button variant="secondary" icon="arrow" onClick={() => go("events")}>Explore all events</Button></section>
  </main><Footer go={go} /></>;
}

function EventsPage({ go }: { go: (p: Page) => void }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => events.filter((event) => (category === "All" || event.category === category) && event.title.toLowerCase().includes(query.toLowerCase())), [query, category]);
  const cats = ["All", "Technical", "Cultural", "Sports", "Workshops", "Music", "Seminars"];
  return <main className="page-main"><section className="page-hero"><div className="container"><span className="eyebrow">EXPLORE THE POSSIBILITIES</span><h1>Find your next experience</h1><p>Discover workshops, competitions, performances, and everything in between.</p><SearchBox setValue={setQuery} value={query} /></div></section>
    <section className="container events-page"><div className="filter-bar"><div className="filter-tabs">{cats.map((cat) => <button className={category === cat ? "active" : ""} key={cat} onClick={() => setCategory(cat)}>{cat}</button>)}</div><div className="filter-actions"><button><Icon name="calendar" size={17} /> Date</button><button><Icon name="filter" size={17} /> Filters</button><select aria-label="Sort events"><option>Sort: Soonest</option><option>Most popular</option><option>Spaces available</option></select></div></div>
      <div className="results-head"><h2>Upcoming events <span>{filtered.length}</span></h2><p>Showing events across all campus venues</p></div>
      {filtered.length ? <div className="events-grid all-events">{filtered.map((event) => <EventCard event={event} go={go} key={event.id} />)}</div> : <div className="empty"><span><Icon name="search" size={28} /></span><h3>No events found</h3><p>Try adjusting your search or clearing the filters.</p><Button onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</Button></div>}
    </section></main>;
}

function DetailPage({ go }: { go: (p: Page) => void }) {
  const event = events[0];
  return <main className="detail-page"><div className="container breadcrumbs"><button onClick={() => go("home")}>Home</button><Icon name="chevron" size={14} /><button onClick={() => go("events")}>Events</button><Icon name="chevron" size={14} /><span>CodeStorm 2025</span></div>
    <section className="detail-banner container"><img alt="Students collaborating at CodeStorm hackathon" src={event.image} /><div className="banner-overlay"><span className="tag tag-violet">Technical</span><h1>{event.title}</h1><p>Build bold. Think different. Create what matters.</p></div><button className="share"><Icon name="share" size={18} /> Share</button></section>
    <div className="container detail-layout"><article className="detail-content">
      <div className="host"><span>TC</span><div><small>Organized by</small><strong>TechNova Coding Club</strong></div><button>View organizer</button></div>
      <section><h2>About this event</h2><p>CodeStorm is our flagship 24-hour campus hackathon where bright minds come together to solve meaningful problems. Whether you're a seasoned developer or building your first project, this is your space to experiment, learn, and create.</p><p>Form a team of 2–4, choose a challenge track, and bring your most ambitious idea to life with expert mentors by your side.</p></section>
      <section><h2>Event schedule</h2><div className="timeline"><div><span>09:00</span><div><strong>Check-in & breakfast</strong><p>Meet your team and collect your welcome kit.</p></div></div><div><span>10:00</span><div><strong>Opening & challenge reveal</strong><p>Choose from AI, sustainability, and campus-life tracks.</p></div></div><div><span>18:00</span><div><strong>Mentor checkpoint</strong><p>Review progress and sharpen your solution.</p></div></div><div><span>Next day</span><div><strong>Final demos & awards</strong><p>Pitch to industry judges and celebrate the winners.</p></div></div></div></section>
      <section><h2>What you need to know</h2><div className="info-grid"><div><span>✓</span><strong>Eligibility</strong><p>Open to all currently enrolled students.</p></div><div><span>⌁</span><strong>Team size</strong><p>2–4 members per team.</p></div><div><span>◇</span><strong>Prizes</strong><p>₹50,000 prize pool plus internship opportunities.</p></div><div><span>▣</span><strong>Bring along</strong><p>Laptop, student ID, and your best ideas.</p></div></div></section>
    </article>
    <aside className="registration-card"><h3>Event details</h3><div className="meta-row"><span><Icon name="calendar" /></span><div><small>Date</small><strong>Saturday, 24 May 2025</strong></div></div><div className="meta-row"><span><Icon name="clock" /></span><div><small>Time</small><strong>9:00 AM – 10:00 AM next day</strong></div></div><div className="meta-row"><span><Icon name="location" /></span><div><small>Venue</small><strong>Innovation Hub, Block C</strong><a>View on map</a></div></div><hr /><div className="seat-head"><strong>18 seats remaining</strong><span>182 / 200</span></div><div className="progress"><span /></div><p className="deadline">Registration closes 22 May at 11:59 PM</p><Button className="wide" icon="arrow" onClick={() => go("register")}>Register for event</Button><small className="safe"><Icon name="check" size={14} /> Free cancellation until 22 May</small></aside>
    </div>
    <section className="container section related"><SectionTitle title="You might also like" action={<Button variant="ghost" onClick={() => go("events")}>View all</Button>} /><div className="events-grid">{events.slice(3, 6).map((item) => <EventCard compact event={item} go={go} key={item.id} />)}</div></section>
  </main>;
}

function Field({ label, placeholder, type = "text", required = false }: { label: string; placeholder: string; type?: string; required?: boolean }) {
  return <label className="field"><span>{label}{required && <b>*</b>}</span><input placeholder={placeholder} required={required} type={type} /></label>;
}

function RegistrationPage({ go }: { go: (p: Page) => void }) {
  const [success, setSuccess] = useState(false);
  if (success) return <main className="success-page"><div className="success-card"><div className="success-icon"><Icon name="check" size={34} /></div><span className="eyebrow">YOU'RE ALL SET</span><h1>Registration confirmed!</h1><p>You're officially registered for CodeStorm 2025. We sent the details to your email.</p><div className="ticket"><div><small>EVENT</small><strong>CodeStorm 2025 Hackathon</strong><p>24 May · 9:00 AM · Innovation Hub</p></div><div className="qr" aria-label="QR code ticket placeholder">{Array.from({ length: 36 }).map((_, i) => <i key={i} />)}</div><div className="ticket-id"><span>Registration ID</span><strong>CC-250524-1847</strong></div></div><div className="success-actions"><Button icon="ticket">Download ticket</Button><Button variant="secondary" onClick={() => go("events")}>Back to events</Button></div></div></main>;
  return <main className="form-page"><div className="container"><button className="back" onClick={() => go("details")}>← Back to event</button><div className="form-layout"><section className="form-card"><span className="eyebrow">EVENT REGISTRATION</span><h1>Save your spot</h1><p>Complete your details below to register for CodeStorm 2025.</p><form onSubmit={(e: FormEvent) => { e.preventDefault(); setSuccess(true); window.scrollTo(0, 0); }}><div className="form-grid"><Field label="Full name" placeholder="Enter your full name" required /><Field label="Email address" placeholder="you@college.edu" required type="email" /><Field label="College ID" placeholder="e.g. CS2025012" required /><label className="field"><span>Department<b>*</b></span><select required><option value="">Select department</option><option>Computer Science</option><option>Engineering</option><option>Business</option><option>Design</option></select></label><label className="field"><span>Year of study<b>*</b></span><select required><option value="">Select year</option><option>First year</option><option>Second year</option><option>Third year</option><option>Fourth year</option></select></label><Field label="Contact number" placeholder="+91 98765 43210" required type="tel" /></div><label className="checkbox"><input required type="checkbox" /><span>I confirm that the details provided are accurate and agree to the event rules and participation guidelines.</span></label><Button className="wide" icon="arrow" type="submit">Confirm registration</Button></form></section>
    <aside className="event-summary"><img alt="CodeStorm participants collaborating" src={events[0].image} /><div><span className="tag tag-violet">Technical</span><h2>CodeStorm 2025 Hackathon</h2><p><Icon name="calendar" size={17} /> Saturday, 24 May 2025</p><p><Icon name="clock" size={17} /> 9:00 AM · 24 hours</p><p><Icon name="location" size={17} /> Innovation Hub, Block C</p><hr /><h3>Registration includes</h3><ul><li><Icon name="check" size={16} /> Welcome kit and meals</li><li><Icon name="check" size={16} /> Mentor sessions</li><li><Icon name="check" size={16} /> Participation certificate</li></ul></div></aside></div></div></main>;
}

const registrations = [
  { name: "CodeStorm 2025 Hackathon", date: "24 May 2025", venue: "Innovation Hub", status: "Confirmed", image: photos.hackathon },
  { name: "Visual Stories: Photography", date: "06 Jun 2025", venue: "Media Lab", status: "Confirmed", image: photos.workshop },
  { name: "Design Thinking Bootcamp", date: "18 Apr 2025", venue: "Design Studio", status: "Completed", image: photos.seminar },
];

function Dashboard({ go }: { go: (p: Page) => void }) {
  return <main className="dashboard-page"><div className="dash-top"><div className="container"><div><span>STUDENT DASHBOARD</span><h1>Welcome back, Ananya</h1><p>Here's what's happening with your campus journey.</p></div><div className="profile-chip"><span>AS</span><div><strong>Ananya Sharma</strong><small>Computer Science · Year 2</small></div></div></div></div><div className="container dashboard-grid"><section className="dash-main"><div className="summary-grid"><div><span className="sum-icon purple"><Icon name="ticket" /></span><p>Registered events</p><strong>06</strong><small>+2 this month</small></div><div><span className="sum-icon blue"><Icon name="calendar" /></span><p>Upcoming events</p><strong>02</strong><small>Next: 24 May</small></div><div><span className="sum-icon green"><Icon name="check" /></span><p>Completed</p><strong>04</strong><small>3 certificates</small></div></div>
      <div className="panel registrations"><div className="panel-head"><div><h2>My registrations</h2><p>Track your events and access your tickets.</p></div><Button variant="ghost" onClick={() => go("events")}>Explore more</Button></div>{registrations.map((item) => <div className="registration-row" key={item.name}><img alt="" src={item.image} /><div className="reg-copy"><strong>{item.name}</strong><span>{item.date} · {item.venue}</span></div><span className={`status ${item.status.toLowerCase()}`}>{item.status}</span><div className="row-actions">{item.status === "Confirmed" ? <><Button variant="secondary" icon="ticket">View ticket</Button><button>•••</button></> : <Button variant="ghost">Certificate</Button>}</div></div>)}</div>
    </section><aside className="dash-side"><div className="panel notifications"><div className="panel-head"><h2>Notifications</h2><button>Mark all read</button></div><div className="notification unread"><span className="sum-icon purple"><Icon name="clock" /></span><div><strong>CodeStorm starts in 3 days</strong><p>Don't forget your laptop and student ID.</p><small>2 hours ago</small></div></div><div className="notification unread"><span className="sum-icon blue"><Icon name="mail" /></span><div><strong>Venue update</strong><p>Photography workshop moved to Media Lab 2.</p><small>Yesterday</small></div></div><div className="notification"><span className="sum-icon green"><Icon name="check" /></span><div><strong>Certificate ready</strong><p>Your bootcamp certificate is ready.</p><small>3 days ago</small></div></div></div><div className="profile-card"><span className="avatar purple">AS</span><h3>Ananya Sharma</h3><p>ananya.sharma@college.edu</p><div><span>Profile complete</span><strong>85%</strong></div><div className="progress"><span style={{ width: "85%" }} /></div><Button variant="secondary">Edit profile</Button></div></aside></div></main>;
}

function MiniChart() {
  const vals = [35, 56, 46, 74, 61, 88, 76, 95];
  return <div className="chart"><div className="chart-lines"><i /><i /><i /><i /></div>{vals.map((v, i) => <span key={i} style={{ height: `${v}%` }}><b>{["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"][i]}</b></span>)}</div>;
}

function Admin({ go }: { go: (p: Page) => void }) {
  const [tab, setTab] = useState("Dashboard");
  const [notice, setNotice] = useState("");
  const role = window.sessionStorage.getItem("cemsRole") || "Administrator";
  const menu = ["Dashboard", "Manage Events", "Registrations", "Attendance", "Students", "Notifications", "Reports", "Settings"];
  const icons: IconName[] = ["home", "calendar", "ticket", "check", "people", "mail", "filter", "user"];
  return <main className="admin-layout"><aside className="admin-sidebar"><Logo light /><nav>{menu.map((item, i) => <button className={tab === item ? "active" : ""} key={item} onClick={() => setTab(item)}><Icon name={icons[i]} />{item}</button>)}</nav><button className="logout-link" onClick={() => go("auth")}>← Logout</button><div className="admin-user"><span>{role === "Coordinator" ? "MC" : "AK"}</span><div><strong>{role === "Coordinator" ? "Meera Chopra" : "Arjun Kumar"}</strong><small>{role}</small></div></div></aside>
    <section className="admin-main"><header className="admin-header"><div><small>{role.toUpperCase()} PORTAL</small><h1>{tab}</h1></div><div><Button variant="secondary" onClick={() => go("home")}>View site</Button><Button icon="arrow" onClick={() => { setTab("Manage Events"); setNotice("Create event form ready"); }}>Create event</Button></div></header>
      {notice && <div className="toast"><Icon name="check" /> {notice}<button onClick={() => setNotice("")}>×</button></div>}
      {tab === "Dashboard" ? <><div className="quick-actions"><Button onClick={() => setTab("Manage Events")}>Create Event</Button><Button variant="secondary" onClick={() => setTab("Attendance")}>Manage Attendance</Button><Button variant="secondary" onClick={() => setTab("Reports")}>Generate Report</Button></div><div className="admin-stats"><div><span className="sum-icon purple"><Icon name="calendar" /></span><p>Total events</p><strong>48</strong><small>↑ 12% vs last semester</small></div><div><span className="sum-icon amber"><Icon name="clock" /></span><p>Upcoming events</p><strong>16</strong><small>6 this week</small></div><div><span className="sum-icon blue"><Icon name="people" /></span><p>Total registrations</p><strong>2,408</strong><small>↑ 18% this month</small></div><div><span className="sum-icon green"><Icon name="check" /></span><p>Attendance rate</p><strong>86%</strong><small>↑ 4.2% this month</small></div></div>
        <div className="admin-charts"><div className="panel"><div className="panel-head"><div><h2>Event registrations</h2><p>Registrations across the last 8 months</p></div><select><option>Last 8 months</option></select></div><MiniChart /></div><div className="panel category-chart"><div className="panel-head"><div><h2>Event categories</h2><p>Distribution by category</p></div></div><div className="donut"><div><strong>48</strong><span>events</span></div></div><ul><li><i className="dot violet" /> Technical <b>32%</b></li><li><i className="dot blue" /> Cultural <b>26%</b></li><li><i className="dot cyan" /> Sports <b>18%</b></li><li><i className="dot amber" /> Others <b>24%</b></li></ul></div></div>
        <div className="admin-lower"><div className="panel admin-table"><div className="panel-head"><div><h2>Recent registrations</h2><p>Latest students joining campus events</p></div><button onClick={() => setTab("Registrations")}>View all</button></div><table><thead><tr><th>Student</th><th>Event</th><th>Registered</th><th>Status</th><th /></tr></thead><tbody>{[["Maya Patel", "CodeStorm 2025", "2 min ago"], ["Kabir Singh", "Aurora Cultural Fest", "12 min ago"], ["Sarah Thomas", "Sports Meet", "28 min ago"], ["Dev Shah", "AI Seminar", "1 hour ago"]].map((r) => <tr key={r[0]}><td><span className="table-avatar">{r[0].split(" ").map(x => x[0]).join("")}</span><strong>{r[0]}</strong></td><td>{r[1]}</td><td>{r[2]}</td><td><span className="status confirmed">Confirmed</span></td><td>•••</td></tr>)}</tbody></table></div><div className="panel activity-panel"><div className="panel-head"><div><h2>Recent activity</h2><p>System updates</p></div></div><p><i className="dot blue" /> Event published <small>5 min ago</small></p><p><i className="dot violet" /> 24 new registrations <small>1 hr ago</small></p><p><i className="dot amber" /> Venue updated <small>Yesterday</small></p></div></div></> : tab === "Manage Events" ? <EventManagement setNotice={setNotice} /> : tab === "Attendance" ? <Attendance setNotice={setNotice} /> : tab === "Notifications" ? <NotificationCenter setNotice={setNotice} /> : tab === "Reports" ? <Reports setNotice={setNotice} /> : tab === "Settings" ? <Settings setNotice={setNotice} role={role} /> : <Participants title={tab} setNotice={setNotice} />}
    </section></main>;
}

function EventManagement({ setNotice }: { setNotice: (n: string) => void }) {
  const [creating, setCreating] = useState(true);
  return <div className="management"><div className="management-head"><div><h2>Manage events</h2><p>Create, edit, and monitor all campus events.</p></div><Button onClick={() => setCreating(!creating)}>{creating ? "View all events" : "Add new event"}</Button></div>
    {creating ? <form className="panel add-event" onSubmit={(e) => { e.preventDefault(); setNotice("Event created successfully"); setCreating(false); }}><div className="form-grid"><Field label="Event name" placeholder="Enter event name" required /><label className="field"><span>Category<b>*</b></span><select required><option>Technical</option><option>Cultural</option><option>Sports</option></select></label><Field label="Date" placeholder="" required type="date" /><Field label="Time" placeholder="" required type="time" /><Field label="Venue" placeholder="Enter campus venue" required /><Field label="Capacity" placeholder="e.g. 200" required type="number" /><Field label="Registration deadline" placeholder="" required type="date" /><Field label="Banner image URL" placeholder="https://..." /></div><label className="field"><span>Description<b>*</b></span><textarea placeholder="Tell students what this event is about..." required /></label><div className="form-actions"><Button variant="secondary" onClick={() => setCreating(false)}>Cancel</Button><Button type="submit">Publish event</Button></div></form> :
    <div className="panel admin-table"><table><thead><tr><th>Event</th><th>Date</th><th>Registrations</th><th>Status</th><th>Actions</th></tr></thead><tbody>{events.slice(0, 5).map((event) => <tr key={event.id}><td><div className="table-event"><img alt="" src={event.image} /><strong>{event.title}</strong></div></td><td>{event.date}</td><td>{200 - event.seats} / 200</td><td><span className="status confirmed">Published</span></td><td><button className="icon-btn"><Icon name="eye" size={17} /></button><button className="icon-btn"><Icon name="trash" size={17} /></button></td></tr>)}</tbody></table></div>}</div>;
}

const participantRows = [
  ["Maya Patel", "STU-2025-0142", "Computer Science", "CC-1847", "Present"],
  ["Kabir Singh", "STU-2025-0261", "Electronics", "CC-1848", "Present"],
  ["Sarah Thomas", "STU-2025-0108", "Business", "CC-1849", "Not Yet Marked"],
  ["Dev Shah", "STU-2024-0934", "Mechanical", "CC-1850", "Absent"],
  ["Ishita Rao", "STU-2025-0204", "Computer Science", "CC-1851", "Not Yet Marked"],
];

function Attendance({ setNotice }: { setNotice: (n: string) => void }) {
  const [statuses, setStatuses] = useState(participantRows.map((row) => row[4]));
  const present = statuses.filter((status) => status === "Present").length;
  return <div className="module-page"><div className="module-toolbar"><div><h2>Attendance tracking</h2><p>CodeStorm 2025 · 24 May · Innovation Hub</p></div><select><option>CodeStorm 2025 Hackathon</option><option>Aurora Cultural Fest</option></select></div>
    <div className="attendance-summary"><div><small>Registered</small><strong>200</strong></div><div><small>Present</small><strong>{182 + present}</strong></div><div><small>Absent</small><strong>13</strong></div><div><small>Attendance</small><strong>92%</strong></div></div>
    <div className="scanner panel"><div className="scan-frame"><span /><Icon name="search" size={30} /></div><div><span className="eyebrow">FAST CHECK-IN</span><h3>Scan student QR ticket</h3><p>Use the camera scanner or enter a registration ID manually.</p><div className="inline-input"><input placeholder="Enter registration ID" /><Button onClick={() => setNotice("Participant checked in successfully")}>Check in</Button></div></div></div>
    <div className="panel admin-table attendance-table"><div className="panel-head"><div><h2>Participant attendance</h2><p>{participantRows.length} records shown · Last saved 2 minutes ago</p></div><div><Button variant="secondary">Export CSV</Button><Button onClick={() => setNotice("Attendance saved successfully")}>Save Attendance</Button></div></div><table><thead><tr><th>Participant</th><th>Student ID</th><th>Department</th><th>Registration ID</th><th>Attendance</th></tr></thead><tbody>{participantRows.map((row, i) => <tr key={row[1]}><td><span className="table-avatar">{row[0].split(" ").map(x => x[0]).join("")}</span><strong>{row[0]}</strong></td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td><td><select className={`attendance-select ${statuses[i].toLowerCase().replaceAll(" ", "-")}`} value={statuses[i]} onChange={(e) => setStatuses(statuses.map((s, x) => x === i ? e.target.value : s))}><option>Present</option><option>Absent</option><option>Not Yet Marked</option></select></td></tr>)}</tbody></table></div>
  </div>;
}

function Participants({ title, setNotice }: { title: string; setNotice: (n: string) => void }) {
  const [query, setQuery] = useState("");
  const rows = participantRows.filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase()));
  return <div className="module-page"><div className="module-toolbar"><div><h2>{title === "Students" ? "Student directory" : "Participant registrations"}</h2><p>Search, review, and manage participant records across events.</p></div><Button variant="secondary">Export participant list</Button></div>
    <div className="capacity-card panel"><div><span>CodeStorm 2025</span><strong>182 <small>/ 200 participants</small></strong></div><div className="progress"><span style={{ width: "91%" }} /></div><p>18 seats available · Registration closes 22 May</p></div>
    <div className="panel admin-table"><div className="table-tools"><SearchBox setValue={setQuery} value={query} /><select><option>All departments</option><option>Computer Science</option><option>Business</option></select><select><option>All statuses</option><option>Confirmed</option><option>Waitlisted</option></select></div><table><thead><tr><th>Student</th><th>Student ID</th><th>Email / Department</th><th>Registration</th><th>Status</th><th>Action</th></tr></thead><tbody>{rows.map((row) => <tr key={row[1]}><td><span className="table-avatar">{row[0].split(" ").map(x => x[0]).join("")}</span><strong>{row[0]}</strong></td><td>{row[1]}</td><td><div>{row[0].toLowerCase().replace(" ", ".")}@college.edu<br /><small>{row[2]}</small></div></td><td>{row[3]}<br /><small>18 May 2025</small></td><td><span className="status confirmed">Confirmed</span></td><td><button className="text-action">View</button><button className="icon-btn" onClick={() => setNotice("Registration cancellation requires confirmation")}><Icon name="trash" size={16} /></button></td></tr>)}</tbody></table>{!rows.length && <div className="table-empty">No participants match your search.</div>}</div>
  </div>;
}

function NotificationCenter({ setNotice }: { setNotice: (n: string) => void }) {
  return <div className="notification-layout"><form className="panel compose-card" onSubmit={(e) => { e.preventDefault(); setNotice("Announcement sent to 182 students"); }}><span className="eyebrow">COMPOSE</span><h2>Send an announcement</h2><Field label="Notification title" placeholder="e.g. Venue update for CodeStorm" required /><label className="field"><span>Related event</span><select><option>CodeStorm 2025 Hackathon</option><option>Aurora Cultural Fest</option><option>All events</option></select></label><label className="field"><span>Target audience</span><select><option>Registered participants</option><option>All students</option><option>Event coordinators</option></select></label><label className="field"><span>Message<b>*</b></span><textarea placeholder="Write a clear announcement..." required /></label><div className="form-actions"><Button variant="secondary">Save draft</Button><Button type="submit">Send notification</Button></div></form>
    <section className="panel history"><div className="panel-head"><div><h2>Notification history</h2><p>Announcements and automated alerts</p></div><select><option>All categories</option></select></div>{[["Venue changed to Innovation Hub B", "Schedule update", "2 hours ago", "unread"], ["Registration confirmed: CodeStorm 2025", "Confirmation", "Yesterday", ""], ["Only 2 days left to register", "Deadline alert", "18 May", ""], ["Sports Meet postponed due to weather", "Event alert", "16 May", "warning"]].map((n) => <article className={`history-item ${n[3]}`} key={n[0]}><span className="sum-icon blue"><Icon name="mail" /></span><div><strong>{n[0]}</strong><p>Sent to registered students · {n[1]}</p><small>{n[2]}</small></div><button>•••</button></article>)}</section>
  </div>;
}

function Reports({ setNotice }: { setNotice: (n: string) => void }) {
  return <div className="module-page"><div className="report-filters panel"><label>Event<select><option>All events</option><option>CodeStorm 2025</option></select></label><label>Date range<select><option>This semester</option><option>Last 30 days</option></select></label><label>Department<select><option>All departments</option></select></label><Button variant="secondary" onClick={() => setNotice("Report filters applied")}>Apply filters</Button><Button onClick={() => setNotice("CSV report is ready to download")}>Export CSV</Button></div>
    <div className="admin-stats report-stats"><div><p>Total registrations</p><strong>2,408</strong><small>+18.4%</small></div><div><p>Students attended</p><strong>2,071</strong><small>86% attendance</small></div><div><p>Capacity utilization</p><strong>78%</strong><small>+6.2%</small></div><div><p>Top department</p><strong>CSE</strong><small>642 students</small></div></div>
    <div className="reports-grid"><div className="panel"><div className="panel-head"><div><h2>Monthly registration trends</h2><p>Registered versus attended participants</p></div></div><MiniChart /></div><div className="panel participation-bars"><div className="panel-head"><div><h2>Department participation</h2><p>Students by academic department</p></div></div>{[["Computer Science", 86], ["Electronics", 70], ["Business", 58], ["Mechanical", 45], ["Design", 32]].map((item) => <div key={item[0]}><span>{item[0]} <b>{item[1]}%</b></span><div><i style={{ width: `${item[1]}%` }} /></div></div>)}</div></div>
    <div className="panel report-table"><div className="panel-head"><div><h2>Event performance</h2><p>Registration, attendance, and capacity summary</p></div><Button variant="secondary">Print report</Button></div><table><thead><tr><th>Event</th><th>Registrations</th><th>Attended</th><th>Attendance rate</th><th>Capacity used</th></tr></thead><tbody>{events.slice(0, 5).map((event, i) => <tr key={event.id}><td>{event.title}</td><td>{182 - i * 17}</td><td>{164 - i * 15}</td><td>{90 - i * 2}%</td><td><div className="mini-progress"><i style={{ width: `${91 - i * 9}%` }} /></div></td></tr>)}</tbody></table></div>
  </div>;
}

function Settings({ setNotice, role }: { setNotice: (n: string) => void; role: string }) {
  return <div className="settings-grid"><nav className="panel settings-nav"><button className="active">Profile information</button><button>Security & password</button><button>Notification preferences</button>{role === "Administrator" && <><button>Event categories</button><button>User roles</button></>}</nav><form className="panel settings-form" onSubmit={(e) => { e.preventDefault(); setNotice("Profile settings saved"); }}><div className="settings-profile"><span>AK</span><div><h2>Profile information</h2><p>Update your personal and college details.</p></div><Button variant="secondary">Change photo</Button></div><div className="form-grid"><Field label="Full name" placeholder="Arjun Kumar" required /><Field label="College email" placeholder="arjun.kumar@college.edu" required type="email" /><Field label="College ID" placeholder="ADM-2025-01" /><Field label="Department" placeholder="Student Affairs" /><Field label="Role" placeholder={role} /><Field label="Contact number" placeholder="+91 98765 43210" /></div><div className="preference"><div><strong>Event notifications</strong><p>Receive updates when an event is published or changed.</p></div><input defaultChecked type="checkbox" /></div><div className="preference"><div><strong>Weekly summary</strong><p>Get a weekly event performance digest by email.</p></div><input defaultChecked type="checkbox" /></div><div className="form-actions"><Button variant="secondary">Cancel</Button><Button type="submit">Save Changes</Button></div></form></div>;
}

function About({ go }: { go: (p: Page) => void }) {
  return <main><section className="about-hero"><div className="container"><div><span className="eyebrow light">ABOUT CEMS</span><h1>Bringing campus life closer, one event at a time.</h1><p>We believe the best parts of college happen beyond the classroom—in moments of discovery, connection, and shared experience.</p></div><img alt="Students connecting at a campus event" src={photos.culture} /></div></section>
    <section className="container mission"><div><span className="eyebrow">OUR MISSION</span><h2>Every student should feel connected to campus life.</h2></div><div><p>CEMS bridges the gap between students looking for meaningful experiences and organizers creating them. One simple platform helps everyone discover, register, organize, and celebrate.</p><p>Built as a college field project, it reflects a simple idea: technology should make community easier—not more complicated.</p></div></section>
    <section className="values"><div className="container"><SectionTitle eyebrow="WHY CEMS" title="Everything campus events need" /><div className="value-grid"><div><span><Icon name="search" /></span><h3>Discover easily</h3><p>Find events by interest, date, or location in seconds.</p></div><div><span><Icon name="ticket" /></span><h3>Register instantly</h3><p>Secure your spot and access tickets from one dashboard.</p></div><div><span><Icon name="people" /></span><h3>Build community</h3><p>Connect students, clubs, and opportunities across campus.</p></div><div><span><Icon name="spark" /></span><h3>Organize better</h3><p>Powerful tools make event management delightfully simple.</p></div></div></div></section>
    <section className="container contact"><div className="contact-copy"><span className="eyebrow">GET IN TOUCH</span><h2>We'd love to hear from you.</h2><p>Have a question, suggestion, or want to bring CEMS to your college?</p><div><span><Icon name="mail" /></span><p><small>Email us</small><strong>hello@cems.edu</strong></p></div><div><span><Icon name="location" /></span><p><small>Visit us</small><strong>Innovation Lab, North Campus</strong></p></div></div><form className="contact-form" onSubmit={(e) => e.preventDefault()}><div className="form-grid"><Field label="Your name" placeholder="Full name" required /><Field label="Email" placeholder="you@email.com" required type="email" /></div><Field label="Subject" placeholder="How can we help?" required /><label className="field"><span>Message<b>*</b></span><textarea placeholder="Tell us a little more..." required /></label><Button icon="arrow">Send message</Button></form></section>
    <section className="cta container"><div><h2>Make your campus experience count.</h2><p>Join thousands of students discovering more every week.</p></div><Button variant="secondary" icon="arrow" onClick={() => go("events")}>Explore events</Button></section>
  </main>;
}

function Auth({ go }: { go: (p: Page) => void }) {
  const [signup, setSignup] = useState(false);
  const [role, setRole] = useState("Student");
  const [show, setShow] = useState(false);
  return <main className="auth-page"><section className="auth-visual"><Logo light /><div><span className="eyebrow light">WELCOME TO CEMS</span><h1>Your campus is full of possibilities.</h1><p>Discover experiences, meet your people, and make every moment count.</p><div className="auth-quote"><p>“I found the events that shaped my college story.”</p><span>— Ananya, Computer Science</span></div></div><small>© 2025 College Event Management System</small></section>
    <section className="auth-form"><button className="auth-home" onClick={() => go("home")}>← Back to home</button><div className="auth-box"><div className="mobile-logo"><Logo /></div><span className="eyebrow">{signup ? "JOIN THE COMMUNITY" : "WELCOME BACK"}</span><h1>{signup ? "Create your account" : "Sign in to CEMS"}</h1><p>{signup ? "Your campus experience starts here." : "Enter your details to continue your journey."}</p><div className="role-switch">{["Student", "Coordinator", "Administrator"].map((r) => <button className={role === r ? "active" : ""} key={r} onClick={() => setRole(r)}><Icon name={r === "Student" ? "user" : "spark"} size={17} />{r}</button>)}</div><form onSubmit={(e) => { e.preventDefault(); window.sessionStorage.setItem("cemsRole", role); go(role === "Student" ? "dashboard" : "admin"); }}>{signup && <><Field label="Full name" placeholder="Enter your full name" required /><div className="form-grid"><Field label="Student ID" placeholder="e.g. STU-2025-0142" required /><Field label="Department" placeholder="Computer Science" required /></div><Field label="Year of study" placeholder="e.g. Second year" required /></>}<Field label={role === "Student" ? "College email" : `${role} email`} placeholder={role === "Student" ? "you@college.edu" : `${role.toLowerCase()}@college.edu`} required type="email" /><label className="field password"><span>Password<b>*</b>{!signup && <button type="button">Forgot password?</button>}</span><div><input placeholder={signup ? "Create a strong password" : "Enter your password"} required type={show ? "text" : "password"} /><button aria-label="Show password" type="button" onClick={() => setShow(!show)}><Icon name="eye" size={18} /></button></div></label><Button className="wide" icon="arrow" type="submit">{signup ? "Create account" : `Sign in as ${role.toLowerCase()}`}</Button></form><div className="or"><span>or continue with</span></div><Button className="wide" variant="secondary">G&nbsp; Google</Button><p className="auth-toggle">{signup ? "Already have an account?" : "New to CEMS?"} <button onClick={() => setSignup(!signup)}>{signup ? "Sign in" : "Create account"}</button></p></div></section>
  </main>;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const go = (next: Page) => { setPage(next); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const showHeader = page !== "auth" && page !== "admin";
  return <>{showHeader && <Header go={go} page={page} />}{page === "home" && <Home go={go} />}{page === "events" && <EventsPage go={go} />}{page === "details" && <DetailPage go={go} />}{page === "register" && <RegistrationPage go={go} />}{page === "dashboard" && <Dashboard go={go} />}{page === "admin" && <Admin go={go} />}{page === "about" && <About go={go} />}{page === "auth" && <Auth go={go} />}</>;
}
