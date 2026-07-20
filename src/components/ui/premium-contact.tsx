"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import confetti from 'canvas-confetti';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Building,
  ArrowUpRight,
  CheckCircle,
  LucideIcon,
  AlertCircle,
} from 'lucide-react';

interface FormInputProps {
  icon: LucideIcon;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
  name: string;
}

const FormInput = ({ icon, type = "text", placeholder, value, onChange, error, name }: FormInputProps) => {
  const Icon = icon;
  return (
    <div className="relative">
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted z-10" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full pl-11 pr-4 py-3.5 bg-base border rounded-lg text-ink placeholder-muted focus:outline-none focus:border-accent/60 transition-all text-base ${error ? 'border-red-500/50' : 'border-line'
          }`}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-400 text-sm mt-1.5"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ContactMethodProps {
  icon: LucideIcon;
  title: string;
  value: string;
  link: string;
}

const ContactMethod = ({ icon, title, value, link }: ContactMethodProps) => {
  const Icon = icon;
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-xl border border-line bg-surface transition-colors duration-500 hover:border-accent/30 hover:bg-surface2"
      variants={fadeInUp}
    >
      <div className="relative flex items-center gap-4 p-5 overflow-hidden">
        <div className="w-12 h-12 shrink-0 rounded-lg bg-surface2 border border-line flex items-center justify-center transition-colors duration-500 group-hover:border-accent/40">
          <Icon className="w-5 h-5 text-ink transition-colors duration-500 group-hover:text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-mono text-[12px] uppercase tracking-[0.25em] text-muted mb-1">{title}</h4>
          <p className="text-ink text-base truncate">{value}</p>
        </div>
        <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
      </div>
    </motion.a>
  );
};

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.23, 0.86, 0.39, 0.96]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

export function PremiumContact({ contactDetails }: { contactDetails: any }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    setSubmitError(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(false);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_73l35bd';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_ms2hj4j';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'L-iyJ5H2SMQuEj5Q5';

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || 'Not provided',
      message: formData.message,
      to_name: 'Tarun',
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setIsSubmitted(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#EAFF00', '#F4F3EE', '#0500E8'] });
      setFormData({ name: '', email: '', company: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative text-ink">
      <motion.div
        className="relative z-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.p
          className="text-lg sm:text-lg text-muted max-w-2xl leading-relaxed mb-12"
          variants={fadeInUp}
        >
          Have a project in mind or just want to say hello? I&apos;d love to hear from you.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div variants={fadeInUp} className="relative rounded-xl border border-line bg-surface">
            <div className="relative p-6 sm:p-8">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FormInput icon={User} placeholder="Your Name" value={formData.name} onChange={handleInputChange} error={errors.name} name="name" />
                    <FormInput icon={Mail} type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} error={errors.email} name="email" />
                    <FormInput icon={Building} placeholder="Company (Optional)" value={formData.company} onChange={handleInputChange} name="company" />

                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 h-4 w-4 text-muted z-10" />
                      <textarea
                        placeholder="Tell me about your project..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`w-full pl-11 pr-4 py-3.5 bg-base border rounded-lg text-ink placeholder-muted focus:outline-none focus:border-accent/60 transition-all resize-none text-base ${errors.message ? 'border-red-500/50' : 'border-line'
                          }`}
                      />
                      <AnimatePresence>
                        {errors.message && (
                          <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-sm mt-1.5">{errors.message}</motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3.5 bg-red-500/10 border border-red-500/20 rounded-lg"
                      >
                        <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
                        <p className="text-red-400 text-sm">
                          Failed to send message. Please try again or contact me directly.
                        </p>
                      </motion.div>
                    )}

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-wipe w-full relative group bg-accent text-lg font-bold py-3.5 px-6 rounded-lg transition-all disabled:opacity-50 hover:text-white"
                      whileTap={{ scale: 0.99 }}
                    >
                      <span className="relative flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-[0.2em]">
                        {isSubmitting ? (
                          <motion.div
                            className="w-4 h-4 border-2 border-base/30 border-t-base rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-10"
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto mb-5"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-8 h-8 text-accent" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-ink mb-3">Message Sent!</h3>
                    <p className="text-muted text-base mb-5">
                      Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                    <motion.button
                      onClick={() => setIsSubmitted(false)}
                      className="text-accent hover:text-ink transition-colors font-mono text-sm uppercase tracking-[0.2em]"
                      whileHover={{ scale: 1.02 }}
                    >
                      Send another message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div className="space-y-4" variants={fadeInUp}>
            <ContactMethod {...contactDetails.email} />
            <ContactMethod {...contactDetails.phone} />
            <ContactMethod {...contactDetails.address} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
