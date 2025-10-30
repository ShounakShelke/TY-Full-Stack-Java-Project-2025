import { motion } from "framer-motion";
import { Users, Target, Award, Globe, Car, Shield, Zap, Heart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/ui/navbar";

const AboutPage = () => {
  const stats = [
    { label: "Happy Customers", value: "50,000+", icon: Users },
    { label: "Cars Available", value: "10,000+", icon: Car },
    { label: "Cities Covered", value: "25+", icon: Globe },
    { label: "Years of Service", value: "8+", icon: Award }
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Safety",
      description: "Every vehicle is verified and insured. Your safety is our top priority with 24/7 support and roadside assistance."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Cutting-edge technology for seamless booking, real-time tracking, and smart fleet management solutions."
    },
    {
      icon: Heart,
      title: "Customer First",
      description: "We listen to our customers and continuously improve our services based on feedback and evolving needs."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making car rentals accessible to everyone, everywhere with transparent pricing and flexible options."
    }
  ];

  const team = [
    {
      name: "Shounak Shelke",
      role: "Co-Founder",
      image: "/placeholder.svg"
    },
    {
      name: "Sahil Kanchan",
      role: "Co-Founder",
      image: "/placeholder.svg"
    },
    {
      name: "Shivam Bhosle",
      role: "Co-Founder",
      image: "/placeholder.svg"
    }
  ];


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-24 pb-12 bg-gradient-primary"
      >
        <div className="container mx-auto px-4">
          <div className="text-center text-white">
            <h1 className="text-5xl font-montserrat font-bold mb-6">
              About CarCircle
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              We're revolutionizing the car rental industry with technology, trust, and
              an unwavering commitment to customer satisfaction.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-muted/30"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <IconComponent className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="text-3xl font-bold text-foreground mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-montserrat font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To make car rentals simple, affordable, and accessible for everyone while
                empowering car owners to maximize their vehicle's earning potential.
              </p>
              <h2 className="text-4xl font-montserrat font-bold mb-6">Our Vision</h2>
              <p className="text-lg text-muted-foreground">
                To be India's most trusted mobility platform, connecting millions of users
                with the perfect vehicle for every journey, powered by technology and driven by trust.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <motion.div
                    key={value.title}
                    whileHover={{ scale: 1.05 }}
                    className="p-6 bg-card rounded-lg shadow-lg"
                  >
                    <IconComponent className="h-8 w-8 text-primary mb-3" />
                    <h3 className="font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>


      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-montserrat font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals driving CarCircle's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="text-center overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <CardHeader>
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription className="text-primary font-semibold">
                      {member.role}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-gradient-primary"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-montserrat font-bold text-white mb-6">
            Join the CarCircle Family
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Be part of our mission to revolutionize mobility. Whether you're looking to rent,
            buy, or share your car, we're here to make it happen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Get Started Today
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
