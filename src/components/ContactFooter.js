import React from 'react';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';

const ContactFooter = () => {
    const contactPersons = [
        {
            name: 'Dr. Vinay M',
            phone: '+91 99863 88234',
            email: 'vinay.m@christuniversity.in'
        },
        {
            name: 'Dr. Gobinath R',
            phone: '+91 99946 22574',
            email: 'gobinath.r@christuniversity.in'
        },
        {
            name: 'Dr. Balakrishnan C',
            phone: '+91 98657 82529',
            email: 'balakrishnan.c@christuniversity.in'
        }
    ];

    return (
        <footer id="contact" style={{ backgroundColor: '#f9f9f9', borderTop: '1px solid #e0e0e0' }}>
            {/* Main Footer Content */}
            <div className="py-6 px-4">
                <div className="max-w-7xl mx-auto space-y-4">
                    {/* Line 1: College Details */}
                    <div className="flex flex-wrap items-center gap-6 text-sm" style={{ color: '#666' }}>
                        <div>
                            <span className="font-bold" style={{ color: '#333' }}>
                                Christ (Deemed to be University)
                            </span>
                            <span className="mx-2">|</span>
                            <span>Department of Computer Science, School of Sciences</span>
                            <span className="mx-2">|</span>
                            <span>Bangalore Yeshwanthpur Campus</span>
                        </div>
                        <a
                            href="https://goo.gl/maps/Ne8HnRegdWst9AeWA"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 transition-colors duration-300"
                            style={{ color: '#4a90e2' }}
                            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                        >
                            <MapPin className="w-3 h-3" />
                            Reach the Campus
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center gap-1 transition-colors duration-300"
                            style={{ color: '#4a90e2' }}
                            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                        >
                            <ExternalLink className="w-3 h-3" />
                            Interested in recruiting?
                        </a>
                        <a
                            href="mailto:cs.placements@christuniversity.in"
                            className="inline-flex items-center gap-1 transition-colors duration-300"
                            style={{ color: '#4a90e2' }}
                            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                        >
                            <Mail className="w-3 h-3" />
                            cs.placements@christuniversity.in
                        </a>
                    </div>

                    {/* Line 2: Faculty Contact Details */}
                    <div className="flex flex-wrap items-center gap-6 text-xs" style={{ color: '#666' }}>
                        {contactPersons.map((person, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <span className="font-semibold" style={{ color: '#333' }}>
                                    {person.name}
                                </span>
                                <a
                                    href={`tel:${person.phone}`}
                                    className="inline-flex items-center gap-1 transition-colors duration-300"
                                    style={{ color: '#666' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#4a90e2'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                                >
                                    <Phone className="w-3 h-3" />
                                    {person.phone}
                                </a>
                                <a
                                    href={`mailto:${person.email}`}
                                    className="inline-flex items-center gap-1 transition-colors duration-300"
                                    style={{ color: '#666' }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#4a90e2'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
                                >
                                    <Mail className="w-3 h-3" />
                                    {person.email}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div 
                className="py-4 px-4 text-center text-sm"
                style={{ 
                    backgroundColor: '#333',
                    color: '#999'
                }}
            >
                <div className="max-w-7xl mx-auto">
                    <p>
                        © {new Date().getFullYear()} CHRIST (Deemed to be University)
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default ContactFooter;