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
                name: 'Dr. Hemanth. K. S',
                phone: '+91 99862 57582',
                email: 'hemanth.ks@christuniversity.in'
            },
            {
                name: 'Renish Nilofer',
                phone: '+91 95911 71755',
                email: 'renish.nilofer@christuniversity.in'
            }
        ];

        return (
            <footer id="contact" style={{ backgroundColor: '#f5f5f5', borderTop: '1px solid #e0e0e0' }}>
                {/* Main Footer Content */}
                <div className="py-8 px-4">
                    <div className="max-w-7xl mx-auto space-y-6">
                        {/* Line 1: University Info */}
                        <div>
                            <h3 className="text-xl font-bold mb-1" style={{ color: '#000' }}>
                                Christ (Deemed to be University)
                            </h3>
                            <div className="text-sm" style={{ color: '#555' }}>
                                <p className="mb-0">
                                    <span className="font-semibold">Department of Computer Science</span> School of Sciences
                                </p>
                                <p className="mb-1">Bangalore Yeshwanthpur Campus</p>
                                <a
                                    href="https://goo.gl/maps/Ne8HnRegdWst9AeWA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 transition-colors duration-300"
                                    style={{ color: '#0000EE' }}
                                    onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                    onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                >
                                    <MapPin className="w-4 h-4" />
                                    Reach the Campus
                                </a>
                            </div>
                        </div>

                        {/* Line 2: Connect with us and Faculty Contacts */}
                        <div className="flex flex-wrap gap-16">
                            {/* Connect with us */}
                            <div style={{ minWidth: '200px' }}>
                                <h3 className="text-base font-bold mb-2" style={{ color: '#000' }}>
                                    Connect with us
                                </h3>
                                <div className="space-y-1 text-sm">
                                    <a
                                        href="#"
                                        className="flex items-center gap-1 transition-colors duration-300"
                                        style={{ color: '#0000EE' }}
                                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Interested in recruiting?
                                    </a>
                                    <a
                                        href="mailto:cs.placements@christuniversity.in"
                                        className="flex items-center gap-1 transition-colors duration-300"
                                        style={{ color: '#0000EE' }}
                                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                    >
                                        <Mail className="w-4 h-4" />
                                        cs.placements@christuniversity.in
                                    </a>
                                </div>
                            </div>

                            {/* Contact Persons */}
                            {contactPersons.map((person, index) => (
                                <div key={index} style={{ minWidth: '220px' }}>
                                    <h3 className="text-base font-bold mb-2" style={{ color: '#000' }}>
                                        {person.name}
                                    </h3>
                                    <div className="space-y-1 text-sm">
                                        <div className="flex items-center gap-1" style={{ color: '#555' }}>
                                            <Phone className="w-4 h-4" />
                                            <a
                                                href={`tel:${person.phone}`}
                                                className="transition-colors duration-300"
                                                style={{ color: '#555' }}
                                                onMouseEnter={(e) => e.currentTarget.style.color = '#0000EE'}
                                                onMouseLeave={(e) => e.currentTarget.style.color = '#555'}
                                            >
                                                {person.phone}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Mail className="w-4 h-4" />
                                            <a
                                                href={`mailto:${person.email}`}
                                                className="transition-colors duration-300"
                                                style={{ color: '#0000EE' }}
                                                onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                                                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                                            >
                                                {person.email}
                                            </a>
                                        </div>
                                    </div>
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