"use client";

import { useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Group,
  Stack,
  Alert,
  Title,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";

export default function ContactClientPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    datetime: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      console.log("Form submitted (client only):", formData);
      setStatus({
        success: true,
        message: `Thank you, ${formData.firstName}! Your message has been sent successfully.`,
      });
      setLoading(false);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        datetime: "",
        message: "",
      });
    }, 1000);
  };

  return (
    <main style={{ maxWidth: 500, margin: "2rem auto" }}>
      <Title order={2} mb="md">
        Contact Form
      </Title>

      <form onSubmit={handleSubmit}>
        <Stack>
          <Group grow>
            <TextInput
              label="First Name"
              name="firstName"
              required
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            <TextInput
              label="Last Name"
              name="lastName"
              required
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </Group>

          <TextInput
            label="Email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />

          <TextInput
            label="Phone Number"
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />

          <DateTimePicker
            label="Date and Time"
            value={formData.datetime}
            onChange={(val) => handleChange("datetime", val || "")}
            required
          />

          <Textarea
            label="Message"
            name="message"
            minRows={4}
            required
            value={formData.message}
            onChange={(e) => handleChange("message", e.target.value)}
          />

          {status && (
            <Alert color={status.success ? "green" : "red"}>
              {status.message}
            </Alert>
          )}

          <Button type="submit" loading={loading}>
            Send Message
          </Button>
        </Stack>
      </form>
    </main>
  );
}
