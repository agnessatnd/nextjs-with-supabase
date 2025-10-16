'use client';

import { useState, useEffect } from 'react';
import { TextInput, Card, Stack, Title, Alert } from '@mantine/core';

export default function CountryClientPage() {
  const [country, setCountry] = useState('Estonia');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCountry() {
      if (!country) return;
      setLoading(true);
      setResult('');

      try {
        const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
        if (!res.ok) {
          setResult('Country not found.');
          return;
        }

        const data = await res.json();
        const capital = data[0].capital?.[0] ?? 'Unknown';
        setResult(`The capital of ${data[0].name.common} is ${capital}.`);
      } catch {
        setResult('Error fetching data.');
      } finally {
        setLoading(false);
      }
    }

    fetchCountry();
  }, [country]);

  return (
    <main style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
      <Card shadow="sm" padding="lg" style={{ width: 400 }}>
        <Title order={2} mb="md" ta="center">
          Country Info
        </Title>

        <Stack>
          <TextInput
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="e.g. Estonia"
          />

          {loading && <Alert color="blue">Loading...</Alert>}
          {!loading && result && <Alert color="green">{result}</Alert>}
        </Stack>
      </Card>
    </main>
  );
}