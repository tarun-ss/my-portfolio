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
  ArrowRight,
  Sparkles,
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
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className={`w-full pl-10 pr-4 py-4 bg-white/[0.08] border rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition-all ${error ? 'border-red-400' : 'border-white/[0.15]'
          }`}
      />
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-400 text-sm mt-2 absolute"
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
  gradient: string;
}

const ContactMethod = ({ icon, title, value, link, gradient }: ContactMethodProps) => {
  const Icon = icon;
  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/[0.15] hover:bg-white/[0.08] transition-all group"
      variants={fadeInUp}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <div className="flex items-center gap-4">
        <motion.div
          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} border border-white/20 flex items-center justify-center`}
        >
          <Icon className="w-7 h-7 text-white" />
        </motion.div>
        <div className="flex-1">
          <h4 className="text-xl font-semibold text-white mb-1">{title}</h4>
          <p className="text-white font-medium break-all">{value}</p>
        </div>
        <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
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

    // EmailJS Configuration
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_73l35bd';
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_ms2hj4j';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'L-iyJ5H2SMQuEj5Q5';

    // Template parameters that will be sent to EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || 'Not provided',
      message: formData.message,
      to_name: 'Tarun', // Your name
    };

    try {
      await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      setIsSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-24 sm:py-32 bg-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.08] via-purple-500/[0.05] to-rose-500/[0.08]"
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: '400% 400%' }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={fadeInUp}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.15] backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.3)" }}
          >
            <Sparkles className="h-4 w-4 text-indigo-300" />
            <span className="text-sm font-medium text-white/80">
              Let's Connect
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>
          <motion.h2
            className="text-4xl sm:text-6xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70"
            variants={fadeInUp}
          >
            Get in Touch
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-white/60 max-w-3xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Have a project in mind or just want to say hello? I'd love to hear from you. Drop me a message and I'll get back to you as soon as possible.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            className="space-y-8"
            variants={fadeInUp}
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormInput icon={User} placeholder="Your Name" value={formData.name} onChange={handleInputChange} error={errors.name} name="name" />
                  <FormInput icon={Mail} type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} error={errors.email} name="email" />
                  <FormInput icon={Building} placeholder="Company (Optional)" value={formData.company} onChange={handleInputChange} name="company" />

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-white/40" />
                    <textarea
                      placeholder="Tell me about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`w-full pl-10 pr-4 py-4 bg-white/[0.08] border rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-indigo-400 transition-all resize-none ${errors.message ? 'border-red-400' : 'border-white/[0.15]'
                        }`}
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-red-400 text-sm mt-2 absolute">{errors.message}</motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-xl"
                    >
                      <AlertCircle className="h-5 w-5 text-red-400" />
                      <p className="text-red-400 text-sm">
                        Failed to send message. Please try again or contact me directly.
                      </p>
                    </motion.div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative group overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-xl transition-all disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
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
                  className="text-center py-12"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-4">Message Sent!</h3>
                  <p className="text-white/60 text-lg mb-6">
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            className="space-y-6"
            variants={fadeInUp}
          >
            <ContactMethod {...contactDetails.email} />
            <ContactMethod {...contactDetails.phone} />
            <ContactMethod {...contactDetails.address} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}