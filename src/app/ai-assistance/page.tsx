'use client';

import { useEffect, useRef, useState, Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { Send, Bot, User, List, ArrowLeft, ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, isSameMonth, isSameDay, addDays } from 'date-fns';

const menuOptions = [
  'Want to hire you',
  'Send me your CV',
  'Schedule a meeting',
  'Other'
];

export default function AIAssistance() {
  const router = useRouter();
  const cvTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leadRef = useRef({
    companyDetails: '',
    phone: '',
    address: '',
    officeContactDetails: '',
    officePhone: '',
    meetingCompany: '',
    meetingDate: '',
    meetingTime: '',
  });
  const flowRef = useRef<
    'idle'
    | 'await_company_details'
    | 'await_phone'
    | 'await_address'
    | 'await_cv_interview'
    | 'await_meeting_date'
    | 'await_meeting_time'
    | 'await_meeting_company'
    | 'await_contact'
    | 'await_office_phone'
  >('idle');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your AI assistant. How can I help you today ?' }
  ]);
  const [input, setInput] = useState('');
  const [showMenu, setShowMenu] = useState(true);
  const [showAllOptions, setShowAllOptions] = useState(false);
  const [flow, setFlow] = useState<'idle' | 'await_company_details' | 'await_phone' | 'await_address' | 'await_cv_interview' | 'await_meeting_date' | 'await_meeting_time' | 'await_meeting_company' | 'await_contact' | 'await_office_phone'>('idle');
  const [meetingDate, setMeetingDate] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [meetingTime, setMeetingTime] = useState('');
  const [tempHour, setTempHour] = useState('09');
  const [tempMinute, setTempMinute] = useState('00');
  const [tempPeriod, setTempPeriod] = useState<'AM' | 'PM'>('AM');
  const [pickingType, setPickingType] = useState<'hour' | 'minute'>('hour');
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const sendLeadSms = async (message: string) => {
    try {
      await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });
    } catch {
      // ignore
    }
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, flow]);

  useEffect(() => {
    flowRef.current = flow;
  }, [flow]);

  const formatTime12h = (time24: string) => {
    const [h, m] = time24.split(':').map(Number);
    if (Number.isNaN(h) || Number.isNaN(m)) return time24;
    const suffix = h >= 12 ? 'pm' : 'am';
    const hours12 = ((h + 11) % 12) + 1;
    return `${String(hours12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${suffix}`;
  };

  const formatDateLong = (dateObj: Date) => {
    return format(dateObj, 'MMMM d, yyyy');
  };

  const handleMeetingDateSubmit = () => {
    leadRef.current.meetingDate = format(meetingDate, 'dd/MM/yyyy');
    setMessages(prev => [...prev, { role: 'user', content: format(meetingDate, 'dd/MM/yyyy') }]);
    setMeetingTime('');
    setFlow('await_meeting_time');
  };

  const handleMeetingTimeSubmit = () => {
    let h = parseInt(tempHour);
    if (tempPeriod === 'PM' && h < 12) h += 12;
    if (tempPeriod === 'AM' && h === 12) h = 0;
    const time24 = `${String(h).padStart(2, '0')}:${tempMinute}`;
    leadRef.current.meetingTime = formatTime12h(time24);
    setMessages(prev => [...prev, { role: 'user', content: formatTime12h(time24) }]);
    setMeetingTime(time24);
    setFlow('await_meeting_company');
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Company Name.' }]);
    }, 400);
  };

  const hours = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
  const minutes = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

  const handleSend = (messageContent?: string) => {
    const content = messageContent || input;
    if (content.trim()) {
      if (cvTimeoutRef.current) {
        clearTimeout(cvTimeoutRef.current);
        cvTimeoutRef.current = null;
      }

      setMessages(prev => [...prev, { role: 'user', content }]);
      setInput('');
      setShowMenu(false);

      if (flow === 'await_contact') {
        const isNumeric = /^\d+$/.test(content.replace(/\s+/g, ''));
        
        if (isNumeric) {
          leadRef.current.officeContactDetails = content;
          setFlow('idle');
          setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Thank you For your Corporation.' }]);
          }, 400);
          setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Hussain Rangwala with connect with you Shortly....' }]);
          }, 900);

          void sendLeadSms(`New Lead Received\n\nType: Other (contact provided)\nContact: ${leadRef.current.officeContactDetails}`);
        } else {
          leadRef.current.officeContactDetails = content;
          setFlow('await_office_phone');
          setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', content: 'Office Phone Number.' }]);
          }, 400);
        }
        return;
      }

      if (flow === 'await_office_phone') {
        leadRef.current.officePhone = content;
        setFlow('idle');
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Thank you For your Corporation.' }]);
        }, 400);
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Hussain Rangwala with connect with you Shortly....' }]);
        }, 900);

        void sendLeadSms(
          `New Lead Received\n\nType: Other\nContact Details: ${leadRef.current.officeContactDetails}\nOffice Phone: ${leadRef.current.officePhone}`
        );
        return;
      }

      if (content === 'Want to hire you') {
        setFlow('await_company_details');
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Please Share Your Company Details.' }]);
        }, 400);
        return;
      }

      if (content === 'Schedule a meeting') {
        setMeetingDate(new Date());
        setCurrentMonth(new Date());
        setMeetingTime('');
        setFlow('await_meeting_date');
        return;
      }

      if (flow === 'await_meeting_company') {
        setFlow('idle');
        const company = content;
        leadRef.current.meetingCompany = company;
        const dateText = formatDateLong(meetingDate);
        const timeText = formatTime12h(meetingTime);
        const reminder = `Dear ${company},
 
This is a reminder regarding our scheduled meeting on ${dateText} at ${timeText}. Please let me know if there are any specific topics you would like to include in the agenda.
 
Looking forward to your participation.
 
Best regards,
Hussain Fakhruddin Rangwala`;
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: reminder }]);
        }, 400);
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Thank you For your Corporation.' }]);
        }, 900);
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Hussain Rangwala with connect with you Shortly....' }]);
        }, 1400);

        void sendLeadSms(
          `New Meeting Scheduled\n\nCompany: ${leadRef.current.meetingCompany}\nDate: ${leadRef.current.meetingDate}\nTime: ${leadRef.current.meetingTime}`
        );
        return;
      }

      if (content === 'Send me your CV') {
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: '[Hussain Resume.pdf](/Hussain-Resume.pdf)' }]);
        }, 400);
        setFlow('await_cv_interview');
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Let me Know if selected for the Interview.' }]);
        }, 800);

        cvTimeoutRef.current = setTimeout(() => {
          if (flowRef.current !== 'await_cv_interview') {
            cvTimeoutRef.current = null;
            return;
          }

          flowRef.current = 'idle';
          setFlow('idle');
          setMessages(prev => [
            ...prev,
            { role: 'assistant', content: 'Thank you For your Corporation.' },
            { role: 'assistant', content: 'Hussain Rangwala with connect with you Shortly....' },
          ]);

          void sendLeadSms('CV requested from AI Assistance page.');
          cvTimeoutRef.current = null;
        }, 20000);
        return;
      }

      if (flow === 'await_cv_interview') {
        setFlow('idle');
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Thank you For your Corporation.' }]);
        }, 400);
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Hussain Rangwala with connect with you Shortly....' }]);
        }, 900);

        void sendLeadSms(`CV flow response: ${content}`);
        return;
      }

      if (flow === 'await_company_details') {
        leadRef.current.companyDetails = content;
        setFlow('await_phone');
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Phone Number.' }]);
        }, 400);
        return;
      }

      if (flow === 'await_phone') {
        leadRef.current.phone = content;
        setFlow('await_address');
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Address.' }]);
        }, 400);
        return;
      }

      if (flow === 'await_address') {
        leadRef.current.address = content;
        setFlow('idle');
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Thank you For your Corporation.' }]);
        }, 400);
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Hussain Rangwala with connect with you Shortly....' }]);
        }, 900);

        void sendLeadSms(
          `New Lead Received\n\nType: Hire\nCompany Details: ${leadRef.current.companyDetails}\nPhone: ${leadRef.current.phone}\nAddress: ${leadRef.current.address}`
        );
        return;
      }

      if (content === 'Other') {
        setFlow('await_contact');
        setTimeout(() => {
          setMessages(prev => [...prev, { role: 'assistant', content: 'Office Contact Details.' }]);
        }, 400);
        return;
      }

      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Thanks for your message! I\'ll get back to you soon.' }]);
      }, 1000);
    }
  };

  const handleMenuClick = (option: string) => {
    handleSend(option);
  };

  const displayedOptions = showAllOptions ? menuOptions : menuOptions.slice(0, 2);

  return (
    <section className="section-padding bg-black/5 dark:bg-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 relative">
          <div className="absolute left-0 top-0">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>
          <div className="text-center pt-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">AI Assistance</h1>
            <p className="text-muted-foreground">Get help with your questions and tasks</p>
            <div className="w-20 h-1.5 bg-primary mt-6 rounded-full mx-auto" />
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <div 
            ref={messagesContainerRef}
            className="h-[520px] overflow-y-auto p-5 md:p-6 space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`p-2 rounded-full border ${
                    message.role === 'user'
                      ? 'bg-primary text-white border-primary/30'
                      : 'bg-primary/10 text-primary border-primary/20'
                  }`}
                >
                  {message.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-background text-foreground border border-border'
                  }`}
                >
                  {message.role === 'assistant' && message.content.startsWith('[') && message.content.includes('](') ? (
                    <p className="text-sm">
                      <a
                        href={message.content.slice(message.content.indexOf('](') + 2, message.content.lastIndexOf(')'))}
                        className="font-medium underline underline-offset-2 hover:text-primary transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {message.content.slice(1, message.content.indexOf(']('))}
                      </a>
                    </p>
                  ) : (
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              </div>
            ))}

            {showMenu && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Bot size={18} />
                </div>
                <div className="flex-1 space-y-2">
                  <p className="text-sm text-muted-foreground mb-2">Please select an option:</p>
                  <div className="space-y-2">
                    {displayedOptions.map((option, index) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => handleMenuClick(option)}
                        className="w-full max-w-[400px] px-6 py-3 bg-background text-foreground rounded-xl text-sm flex items-center gap-3 border border-border hover:border-primary/40 hover:bg-primary/5 transition-colors"
                      >
                        <span className="text-primary font-bold">←</span>
                        <span className="text-muted-foreground">{index + 1}</span>
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>
                  {!showAllOptions && (
                    <button
                      onClick={() => setShowAllOptions(true)}
                      className="w-full max-w-[400px] px-6 py-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/15 transition-colors text-sm flex items-center justify-center gap-3 border border-primary/20"
                    >
                      <List size={16} />
                      <span>See all options</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {flow === 'await_meeting_date' && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Bot size={18} />
                </div>
                <div className="max-w-[320px] w-full bg-background border border-border rounded-3xl shadow-xl overflow-hidden">
                  {/* Date Input Header */}
                  <div className="p-4 flex items-center justify-between border-b border-border bg-muted/5">
                    <span className="text-sm font-medium text-muted-foreground">{format(meetingDate, 'dd/MM/yyyy')}</span>
                    <CalendarIcon size={20} className="text-muted-foreground" />
                  </div>

                  {/* Calendar Interface */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 hover:bg-muted rounded-full transition-colors">
                        <ChevronLeft size={20} className="text-muted-foreground" />
                      </button>
                      <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
                        {format(currentMonth, 'MMMM yyyy')}
                      </h3>
                      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 hover:bg-muted rounded-full transition-colors">
                        <ChevronRight size={20} className="text-muted-foreground" />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-[10px] font-bold text-muted-foreground text-center py-2">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">
                      {(() => {
                        const monthStart = startOfMonth(currentMonth);
                        const monthEnd = endOfMonth(monthStart);
                        const startDate = startOfWeek(monthStart);
                        const endDate = endOfWeek(monthEnd);
                        const rows = [];
                        let days = [];
                        let day = startDate;

                        while (day <= endDate) {
                          for (let i = 0; i < 7; i++) {
                            const cloneDay = day;
                            days.push(
                              <button
                                key={day.toString()}
                                onClick={() => setMeetingDate(cloneDay)}
                                className={`h-8 w-8 text-xs rounded-full flex items-center justify-center transition-all ${
                                  !isSameMonth(day, monthStart)
                                    ? 'text-muted-foreground/30 pointer-events-none'
                                    : isSameDay(day, meetingDate)
                                    ? 'bg-primary/20 text-primary font-bold border border-primary/30'
                                    : 'text-foreground hover:bg-muted'
                                }`}
                              >
                                {format(day, 'd')}
                              </button>
                            );
                            day = addDays(day, 1);
                          }
                          rows.push(<Fragment key={day.toString()}>{days}</Fragment>);
                          days = [];
                        }
                        return rows;
                      })()}
                    </div>
                  </div>

                  <div className="p-3 bg-muted/10 flex justify-end gap-2 border-t border-border">
                    <button
                      onClick={() => setFlow('idle')}
                      className="px-4 py-2 text-xs font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleMeetingDateSubmit}
                      className="px-4 py-2 text-xs font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors uppercase"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            )}

            {flow === 'await_meeting_time' && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                  <Bot size={18} />
                </div>
                <div className="max-w-[320px] w-full bg-background border border-border rounded-2xl shadow-xl overflow-hidden">
                  <div className="p-4 border-b border-border bg-muted/30">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-4">Select Time</p>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setPickingType('hour')}
                          className={`text-4xl font-medium p-2 rounded-lg transition-colors ${pickingType === 'hour' ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-foreground'}`}
                        >
                          {tempHour}
                        </button>
                        <span className="text-4xl font-medium text-foreground">:</span>
                        <button
                          onClick={() => setPickingType('minute')}
                          className={`text-4xl font-medium p-2 rounded-lg transition-colors ${pickingType === 'minute' ? 'bg-primary/20 text-primary' : 'bg-muted/50 text-foreground'}`}
                        >
                          {tempMinute}
                        </button>
                      </div>
                      <div className="flex flex-col border border-border rounded-lg overflow-hidden text-[10px] font-bold">
                        <button
                          onClick={() => setTempPeriod('AM')}
                          className={`px-3 py-2 transition-colors ${tempPeriod === 'AM' ? 'bg-primary/20 text-primary border-b border-border' : 'bg-background text-muted-foreground border-b border-border'}`}
                        >
                          AM
                        </button>
                        <button
                          onClick={() => setTempPeriod('PM')}
                          className={`px-3 py-2 transition-colors ${tempPeriod === 'PM' ? 'bg-primary/20 text-primary' : 'bg-background text-muted-foreground'}`}
                        >
                          PM
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex justify-center bg-background relative aspect-square">
                    <div className="w-full h-full rounded-full bg-muted/30 relative flex items-center justify-center">
                      <div className="absolute w-1 h-1 bg-primary rounded-full z-20" />
                      
                      {/* Clock Hand */}
                      <div 
                        className="absolute bottom-1/2 left-1/2 w-0.5 bg-primary origin-bottom z-10 transition-transform duration-300"
                        style={{ 
                          height: '38%', // Match the radius of numbers
                          transform: `translateX(-50%) rotate(${
                            pickingType === 'hour' 
                              ? (parseInt(tempHour) % 12) * 30 
                              : parseInt(tempMinute) * 6
                          }deg)` 
                        }}
                      >
                        {/* Selector Circle */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary" />
                      </div>

                      {/* Numbers */}
                      {(pickingType === 'hour' ? hours : minutes).map((val, i) => {
                        const angle = (i * 30) - 90;
                        const radius = 38; 
                        const isSelected = pickingType === 'hour' 
                          ? tempHour === val.padStart(2, '0')
                          : tempMinute === val.padStart(2, '0');

                        return (
                          <button
                            key={val}
                            onClick={() => {
                              if (pickingType === 'hour') {
                                setTempHour(val.padStart(2, '0'));
                                setPickingType('minute');
                              } else {
                                setTempMinute(val.padStart(2, '0'));
                              }
                            }}
                            className={`absolute w-9 h-9 flex items-center justify-center text-sm font-medium transition-colors rounded-full z-20 ${
                              isSelected ? 'text-white' : 'text-foreground hover:bg-primary/10 hover:text-primary'
                            }`}
                            style={{
                              left: `${50 + radius * Math.cos((angle * Math.PI) / 180)}%`,
                              top: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
                              transform: 'translate(-50%, -50%)'
                            }}
                          >
                            {parseInt(val)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="p-3 bg-muted/10 flex justify-end gap-2 border-t border-border">
                    <button
                      onClick={() => setFlow('idle')}
                      className="px-4 py-2 text-xs font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors uppercase"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleMeetingTimeSubmit}
                      className="px-4 py-2 text-xs font-bold text-primary hover:bg-primary/10 rounded-lg transition-colors uppercase"
                    >
                      OK
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-border p-4 md:p-5 bg-background/60">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-background text-foreground rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                onClick={() => handleSend()}
                className="px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
