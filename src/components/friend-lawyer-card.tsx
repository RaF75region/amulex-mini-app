'use client';

import { Box, Button, Stack, Typography } from '@mui/material';

const unionIcon = '/assets/union.svg';

export function FriendLawyerCard() {
  return (
    <Stack
      data-name="Карточка"
      data-node-id="426:9719"
      gap="16px"
      alignItems="center"
      padding="16px"
      borderRadius="16px"
      sx={{
        width: '100%',
        backgroundImage: 'linear-gradient(138.95754112395707deg, rgba(105, 137, 227, 1) 12.302%, rgba(138, 166, 244, 1) 64.823%)',
      }}
    >
      <Typography
        data-node-id="426:9720"
        align="center"
        color="#FFFFFF"
        fontWeight={600}
        fontSize={28}
        lineHeight={1.1}
      >
        Твой Друг Юрист
      </Typography>
      <Typography
        data-node-id="426:9721"
        align="center"
        color="#FFFFFF"
        fontWeight={400}
        fontSize={10}
        lineHeight={1.3}
      >
        Твой Друг Юрист — нейросеть компании Амулекс, обученная на законодательстве,
        подзаконных актах и судебной практики
      </Typography>
      <Stack
        data-node-id="426:9722"
        direction="row"
        width="100%"
        color="#FFFFFF"
        textAlign="center"
      >
        <StatBlock value="10К+" label="Пользователей" valueNodeId="426:9724" labelNodeId="426:9725" />
        <StatBlock value="№1" label="Сервис в РФ" valueNodeId="426:9727" labelNodeId="426:9728" />
        <StatBlock value="95%" label="Довольных клиентов" valueNodeId="426:9730" labelNodeId="426:9731" />
      </Stack>
      <Button
        data-name="Кнопка"
        data-node-id="426:9732"
        fullWidth
        sx={{
          height: 40,
          borderRadius: '12px',
          backgroundColor: '#FFFFFF',
          color: '#8AA6F4',
          fontWeight: 600,
          fontSize: 12,
          lineHeight: 1.3,
          textTransform: 'none',
          paddingX: '16px',
          gap: '8px',
          '&:hover': {
            backgroundColor: '#FFFFFF',
          },
        }}
        endIcon={
          <Box
            data-name="Кнопка"
            data-node-id="426:9742"
            sx={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Box
              data-name="Union"
              data-node-id="426:9743"
              component="img"
              src={unionIcon}
              alt=""
              sx={{ width: 8, height: 8 }}
            />
          </Box>
        }
      >
        Зарегистрироваться сейчас
      </Button>
    </Stack>
  );
}

interface StatBlockProps {
  value: string;
  label: string;
  valueNodeId: string;
  labelNodeId: string;
}

function StatBlock({ value, label, valueNodeId, labelNodeId }: StatBlockProps) {
  return (
    <Stack data-name="Строка" direction="column" alignItems="center" flex={1} gap="2px">
      <Typography
        data-node-id={valueNodeId}
        align="center"
        color="#FFFFFF"
        fontWeight={600}
        fontSize={28}
        lineHeight={1.1}
      >
        {value}
      </Typography>
      <Typography
        data-node-id={labelNodeId}
        align="center"
        color="#FFFFFF"
        fontWeight={400}
        fontSize={10}
        lineHeight={1.3}
      >
        {label}
      </Typography>
    </Stack>
  );
}
