import { Card, Stack, Title, Text, Alert } from '@mantine/core';

export default async function CountryServerPage() {
  "use server";
  const country = 'Estonia';

  let result: string;

  try {
    const res = await fetch(`https://restcountries.com/v3.1/name/${country}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      result = 'Country not found.';
    } else {
      const data = await res.json();
      const info = data[0];
      const capital = info.capital?.[0] ?? 'Unknown';
      result = `The capital of ${info.name.common} is ${capital}.`;
    }
  } catch {
    result = 'Error fetching data.';
  }

  return (
    <main style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
      <Card shadow="sm" padding="lg" style={{ width: 400 }}>
        <Title order={2} mb="md" ta="center">
          Country Info
        </Title>

        <Stack>
          <Text fw={500}>Country: {country}</Text>
          <Alert color="green">{result}</Alert>
        </Stack>
      </Card>
    </main>
  );
}
