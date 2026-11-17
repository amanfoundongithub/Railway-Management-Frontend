import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Chip,
  CircularProgress,
  Drawer,
  Fab,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import { aiConciergeService } from '../api/aiConciergeService';

const QUICK_PROMPTS = [
  'Check my PNR route & stops',
  'Estimate cab fare at my destination',
  'Show retiring rooms at my arrival station',
];

export const AiConciergeWidget = ({ defaultPnr = '' }) => {
  const [open, setOpen] = useState(false);
  const [pnr, setPnr] = useState(defaultPnr);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hi! I am your NXT_RAIL AI Concierge. Enter your 10-digit PNR above or in chat, and I can check your route, calculate cab fares to any landmark, or book retiring rooms for your journey.',
    },
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (customText) => {
    const textToSend = (customText ?? input).trim();
    if (!textToSend || loading) return;

    // Automatically detect if user typed a 10-digit PNR in their message
    const pnrMatch = textToSend.match(/\b\d{10}\b/);
    const activePnr = pnrMatch ? pnrMatch[0] : pnr;
    if (pnrMatch && !pnr) setPnr(pnrMatch[0]);

    const updatedMessages = [...messages, { role: 'user', content: textToSend }];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const data = await aiConciergeService.sendMessage(updatedMessages, activePnr);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply,
          actions: data.executedActions || [],
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            err.response?.data?.message ||
            'Unable to reach the AI Concierge right now. Please ensure you are logged in.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Tooltip title="Ask NXT_RAIL AI Concierge" placement="left">
        <Fab
          color="primary"
          onClick={() => setOpen(true)}
          sx={{
            position: 'fixed',
            bottom: 28,
            right: 28,
            bgcolor: '#1a365d',
            '&:hover': { bgcolor: '#102a4c' },
            zIndex: 1300,
            boxShadow: '0 8px 24px rgba(26,54,93,0.35)',
          }}
        >
          <AutoAwesomeIcon />
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 420 }, display: 'flex', flexDirection: 'column' },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 2.5,
            bgcolor: '#1a365d',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <AutoAwesomeIcon fontSize="small" />
            <Box>
              <Typography variant="subtitle1" fontWeight={800} lineHeight={1.2}>
                NXT_RAIL AI Concierge
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.85 }}>
                Agentic PNR Assistant · Cabs & Hotels
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={() => setOpen(false)} sx={{ color: 'white' }}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Active PNR Context Bar */}
        <Box sx={{ px: 2, py: 1.5, bgcolor: '#f4f6f8', borderBottom: '1px solid #e0e4e8' }}>
          <TextField
            size="small"
            fullWidth
            label="Active 10-Digit PNR (Optional)"
            placeholder="e.g. 4534220799"
            value={pnr}
            inputProps={{ maxLength: 10 }}
            onChange={(e) => setPnr(e.target.value.replace(/\D/g, ''))}
            sx={{ bgcolor: 'white', borderRadius: 1 }}
          />
        </Box>

        {/* Chat Messages Area */}
        <Box sx={{ flexGrow: 1, p: 2, overflowY: 'auto', bgcolor: '#f9fafb', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {messages.map((msg, idx) => {
            const isUser = msg.role === 'user';
            return (
              <Box
                key={idx}
                sx={{
                  alignSelf: isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                }}
              >
                {msg.actions?.length > 0 && (
                  <Box display="flex" gap={0.5} flexWrap="wrap" mb={0.5}>
                    {msg.actions.map((act, i) => (
                      <Chip
                        key={i}
                        size="small"
                        label={`⚡ ${act.tool.replace(/_/g, ' ')}`}
                        sx={{ fontSize: '0.68rem', height: 20, bgcolor: '#e6f0ff', color: '#1a365d', fontWeight: 700 }}
                      />
                    ))}
                  </Box>
                )}

                <Paper
                  elevation={0}
                  sx={{
                    p: 1.75,
                    borderRadius: 3,
                    bgcolor: isUser ? '#1a365d' : 'white',
                    color: isUser ? 'white' : 'text.primary',
                    border: isUser ? 'none' : '1px solid #e0e4e8',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  <Typography variant="body2" sx={{ lineHeight: 1.5 }}>
                    {msg.content}
                  </Typography>
                </Paper>
              </Box>
            );
          })}

          {loading && (
            <Box display="flex" alignItems="center" gap={1} p={1}>
              <CircularProgress size={18} />
              <Typography variant="caption" color="text.secondary">
                Checking live railway & vendor data...
              </Typography>
            </Box>
          )}
          <div ref={messagesEndRef} />
        </Box>

        {/* Quick Prompts */}
        <Box sx={{ px: 2, py: 1, display: 'flex', gap: 1, overflowX: 'auto', borderTop: '1px solid #eee' }}>
          {QUICK_PROMPTS.map((prompt) => (
            <Chip
              key={prompt}
              label={prompt}
              size="small"
              onClick={() => handleSend(prompt)}
              sx={{ cursor: 'pointer', fontWeight: 600 }}
            />
          ))}
        </Box>

        {/* Input Box */}
        <Box sx={{ p: 2, borderTop: '1px solid #e0e4e8', display: 'flex', gap: 1, bgcolor: 'white' }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Ask e.g. 'Book a Sedan at NDLS to Connaught Place'"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <IconButton
            color="primary"
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            sx={{ bgcolor: '#1a365d', color: 'white', '&:hover': { bgcolor: '#102a4c' } }}
          >
            <SendIcon fontSize="small" />
          </IconButton>
        </Box>
      </Drawer>
    </>
  );
};