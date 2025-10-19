import { useState, useRef, useEffect } from 'react';
import { 
  Send, Search, Phone, Video, MoreVertical, Paperclip, Smile, 
  Image as ImageIcon, Check, CheckCheck, Star, Pin, Archive, 
  Trash2, Copy, Reply, Filter, X as XIcon, ArrowDown
} from 'lucide-react';
import { useConfirmDialog } from '../ConfirmDialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';

type UserRole = 'client' | 'provider' | 'admin';
type FilterType = 'all' | 'unread' | 'favorites';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar?: string;
  online: boolean;
  role: 'client' | 'provider';
  typing?: boolean;
  pinned?: boolean;
  favorite?: boolean;
  lastSeen?: string;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  type: 'text' | 'image' | 'file';
  status?: 'sent' | 'delivered' | 'read';
}

interface MessagingProps {
  userRole: UserRole;
}

export function Messaging({ userRole }: MessagingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { showConfirm, ConfirmDialog } = useConfirmDialog();

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: userRole === 'client' ? 'Ahmed Belkacem' : 'Ahmed Benali',
      lastMessage: 'J\'arrive dans 5 minutes',
      timestamp: 'il y a 2 min',
      unread: 2,
      online: true,
      role: userRole === 'client' ? 'provider' : 'client',
      typing: true,
      pinned: true,
      favorite: true,
    },
    {
      id: '2',
      name: userRole === 'client' ? 'Karim Mechanic Pro' : 'Sarah Mansouri',
      lastMessage: 'Le service est terminé',
      timestamp: 'il y a 1h',
      unread: 0,
      online: false,
      role: userRole === 'client' ? 'provider' : 'client',
      pinned: false,
      favorite: true,
      lastSeen: 'Hier à 22:15',
    },
    {
      id: '3',
      name: userRole === 'client' ? 'Mobile Wash DZ' : 'Yacine Kaddour',
      lastMessage: 'Merci pour votre confiance',
      timestamp: 'il y a 3h',
      unread: 0,
      online: true,
      role: userRole === 'client' ? 'provider' : 'client',
      favorite: false,
    },
    {
      id: '4',
      name: userRole === 'client' ? 'Express Detailing' : 'Amina Bouzid',
      lastMessage: 'Rendez-vous confirmé',
      timestamp: 'Hier',
      unread: 0,
      online: false,
      role: userRole === 'client' ? 'provider' : 'client',
      lastSeen: 'Hier à 18:30',
    },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      content: 'Bonjour, je voudrais réserver un lavage complet pour demain à 11h.',
      timestamp: '10:30',
      isOwn: true,
      type: 'text',
      status: 'read',
    },
    {
      id: '2',
      senderId: '2',
      content: 'Bonjour ! Oui, c\'est disponible. À quelle adresse ?',
      timestamp: '10:32',
      isOwn: false,
      type: 'text',
      status: 'read',
    },
    {
      id: '3',
      senderId: '1',
      content: 'Cité Essalem, Alger. Il y a un point d\'eau à proximité ?',
      timestamp: '10:35',
      isOwn: true,
      type: 'text',
      status: 'read',
    },
    {
      id: '4',
      senderId: '1',
      content: 'Oui, pas de problème pour l\'eau. Je vous attends à 11h.',
      timestamp: '10:36',
      isOwn: true,
      type: 'text',
      status: 'read',
    },
    {
      id: '5',
      senderId: '2',
      content: 'Super ! Je suis en route maintenant.',
      timestamp: '10:50',
      isOwn: false,
      type: 'text',
      status: 'read',
    },
    {
      id: '6',
      senderId: '2',
      content: 'J\'arrive dans 5 minutes',
      timestamp: '10:55',
      isOwn: false,
      type: 'text',
      status: 'delivered',
    },
  ]);

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  // Auto-scroll to bottom
  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end'
      });
    }
  };

  // Mark messages as read when conversation is selected
  const markConversationAsRead = (convId: string) => {
    const conversation = conversations.find(c => c.id === convId);
    const unreadCount = conversation?.unread || 0;
    
    if (unreadCount > 0) {
      setConversations(prev => prev.map(conv => 
        conv.id === convId ? { ...conv, unread: 0 } : conv
      ));
      
      setMessages(prev => prev.map(msg => 
        !msg.isOwn && msg.status !== 'read' 
          ? { ...msg, status: 'read' as const }
          : msg
      ));
      
      setTimeout(() => {
        toast.success(`${unreadCount} message${unreadCount > 1 ? 's' : ''} marqué${unreadCount > 1 ? 's' : ''} comme lu${unreadCount > 1 ? 's' : ''}`, {
          duration: 2000,
        });
      }, 500);
    }
  };

  // Auto-scroll on new messages
  useEffect(() => {
    scrollToBottom(true);
  }, [messages]);

  // Mark as read when conversation changes
  useEffect(() => {
    if (selectedConversation) {
      markConversationAsRead(selectedConversation);
      scrollToBottom(false);
    }
  }, [selectedConversation]);

  // Handle scroll detection
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      setShowScrollButton(!isAtBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: '1',
        content: messageInput,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        type: 'text',
        status: 'sent',
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
      
      // Simulate delivery status
      setTimeout(() => {
        setMessages(prev => prev.map(m => 
          m.id === newMessage.id ? { ...m, status: 'delivered' as const } : m
        ));
      }, 1000);

      // Simulate read status
      setTimeout(() => {
        setMessages(prev => prev.map(m => 
          m.id === newMessage.id ? { ...m, status: 'read' as const } : m
        ));
      }, 3000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getMessageStatusIcon = (status?: 'sent' | 'delivered' | 'read') => {
    if (status === 'read') {
      return <CheckCheck size={16} className="text-[#FF6B35]" />;
    } else if (status === 'delivered') {
      return <CheckCheck size={16} className="text-gray-400" />;
    } else {
      return <Check size={16} className="text-gray-400" />;
    }
  };

  const toggleFavorite = (convId: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === convId ? { ...conv, favorite: !conv.favorite } : conv
    ));
  };

  const togglePin = (convId: string) => {
    setConversations(prev => prev.map(conv => 
      conv.id === convId ? { ...conv, pinned: !conv.pinned } : conv
    ));
  };

  const handleDeleteConversation = (convId: string, convName: string) => {
    showConfirm({
      title: 'Supprimer la conversation',
      description: `Êtes-vous sûr de vouloir supprimer la conversation avec ${convName} ? Cette action est irréversible.`,
      confirmText: 'Supprimer',
      cancelText: 'Annuler',
      type: 'danger',
      onConfirm: () => {
        setConversations(prev => prev.filter(c => c.id !== convId));
        if (selectedConversation === convId) {
          setSelectedConversation(null);
        }
        toast.success('Conversation supprimée avec succès');
      },
    });
  };

  const handleArchiveConversation = (convId: string, convName: string) => {
    showConfirm({
      title: 'Archiver la conversation',
      description: `Voulez-vous archiver la conversation avec ${convName} ?`,
      confirmText: 'Archiver',
      cancelText: 'Annuler',
      type: 'info',
      onConfirm: () => {
        // Logique d'archivage
        toast.success('Conversation archivée');
      },
    });
  };

  const handleDeleteMessage = (messageId: string) => {
    showConfirm({
      title: 'Supprimer le message',
      description: 'Êtes-vous sûr de vouloir supprimer ce message ? Cette action est irréversible.',
      confirmText: 'Supprimer',
      cancelText: 'Annuler',
      type: 'danger',
      onConfirm: () => {
        setMessages(prev => prev.filter(m => m.id !== messageId));
        toast.success('Message supprimé');
      },
    });
  };

  const filteredConversations = conversations
    .filter(conv => {
      if (filterType === 'unread') return conv.unread > 0;
      if (filterType === 'favorites') return conv.favorite;
      return true;
    })
    .filter(conv => 
      conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });

  return (
    <div className="h-[calc(100vh-120px)] bg-[#0A0A0A] rounded-2xl border border-white/10 overflow-hidden flex">
      {/* Conversations List */}
      <div className="w-80 border-r border-white/10 flex flex-col bg-[#0A0A0A]/50 backdrop-blur-xl">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white">Messages</h2>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
                    <Filter size={20} className={filterType !== 'all' ? 'text-[#FF6B35]' : 'text-gray-400'} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1a1a1a] border-white/10 text-white">
                  <DropdownMenuItem 
                    onClick={() => setFilterType('all')}
                    className={filterType === 'all' ? 'bg-white/5' : 'hover:bg-white/5'}
                  >
                    Tous les messages
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setFilterType('unread')}
                    className={filterType === 'unread' ? 'bg-white/5' : 'hover:bg-white/5'}
                  >
                    Non lus
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setFilterType('favorites')}
                    className={filterType === 'favorites' ? 'bg-white/5' : 'hover:bg-white/5'}
                  >
                    Favoris
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              placeholder="Rechercher une conversation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1a1a1a] border-white/10 text-white placeholder:text-gray-500 focus:border-[#FF6B35]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <XIcon size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto messaging-scroll">
          <div className="p-2">
            <AnimatePresence>
              {filteredConversations.map((conv, index) => (
                <motion.button
                  key={conv.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`
                    w-full p-3 rounded-xl mb-2 text-left transition-all
                    ${selectedConversation === conv.id 
                      ? 'bg-gradient-to-r from-[#FF6B35]/20 to-[#F7931E]/20 border border-[#FF6B35]/30' 
                      : 'hover:bg-white/5 border border-transparent'
                    }
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative flex-shrink-0">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="" alt={conv.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#FF6B35] to-[#F7931E] text-white">
                          {conv.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {conv.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A0A0A]" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-white truncate">{conv.name}</p>
                        <div className="flex items-center gap-1 ml-2">
                          {conv.pinned && <Pin size={14} className="text-[#FF6B35] flex-shrink-0" />}
                          {conv.favorite && <Star size={14} className="text-yellow-500 flex-shrink-0" />}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {conv.typing ? (
                            <div className="flex items-center gap-1 text-[#FF6B35] text-sm">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                              >
                                •
                              </motion.div>
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                              >
                                •
                              </motion.div>
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                              >
                                •
                              </motion.div>
                              <span className="ml-1">en train d'écrire</span>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-400 truncate">
                              {conv.lastMessage}
                            </p>
                          )}
                        </div>
                        {conv.unread > 0 && (
                          <Badge className="ml-2 bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white rounded-full h-5 min-w-5 flex items-center justify-center px-2 text-xs border-0">
                            {conv.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{conv.timestamp}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      {selectedConv ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#0A0A0A]/50 backdrop-blur-xl flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10 border-2 border-white/10">
                  <AvatarImage src="" alt={selectedConv.name} />
                  <AvatarFallback className="bg-gradient-to-br from-[#FF6B35] to-[#F7931E] text-white">
                    {selectedConv.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {selectedConv.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0A0A0A]" />
                )}
              </div>
              <div>
                <p className="text-white">{selectedConv.name}</p>
                <p className="text-xs text-gray-400">
                  {selectedConv.typing ? (
                    <span className="text-[#FF6B35]">En train d'écrire...</span>
                  ) : selectedConv.online ? (
                    'En ligne'
                  ) : (
                    `Vu ${selectedConv.lastSeen}`
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
                      <Phone size={20} className="text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Appel vocal</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
                      <Video size={20} className="text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Appel vidéo</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/5">
                    <MoreVertical size={20} className="text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#1a1a1a] border-white/10 text-white">
                  <DropdownMenuItem 
                    onClick={() => toggleFavorite(selectedConv.id)}
                    className="hover:bg-white/5"
                  >
                    <Star size={16} className={`mr-2 ${selectedConv.favorite ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                    {selectedConv.favorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => togglePin(selectedConv.id)}
                    className="hover:bg-white/5"
                  >
                    <Pin size={16} className="mr-2" />
                    {selectedConv.pinned ? 'Désépingler' : 'Épingler'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem 
                    onClick={() => handleArchiveConversation(selectedConv.id, selectedConv.name)}
                    className="hover:bg-white/5"
                  >
                    <Archive size={16} className="mr-2" />
                    Archiver
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDeleteConversation(selectedConv.id, selectedConv.name)}
                    className="text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 size={16} className="mr-2" />
                    Supprimer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 relative overflow-hidden">
            <div 
              ref={messagesContainerRef}
              className="h-full overflow-y-auto p-4 bg-[#0A0A0A] messaging-scroll"
              style={{ scrollBehavior: 'smooth' }}
            >
              {/* Date separator */}
              <div className="flex items-center justify-center mb-6">
                <div className="px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-full">
                  <p className="text-xs text-gray-400">Aujourd'hui</p>
                </div>
              </div>

              <div className="space-y-4 pb-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    {!message.isOwn && (
                      <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                        <AvatarImage src="" alt={selectedConv.name} />
                        <AvatarFallback className="bg-gradient-to-br from-[#FF6B35] to-[#F7931E] text-white text-xs">
                          {selectedConv.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div
                          className={`
                            max-w-[70%] rounded-2xl px-4 py-3 cursor-pointer group relative
                            ${message.isOwn
                              ? 'bg-gradient-to-r from-[#FF6B35] to-[#F7931E] text-white rounded-br-sm'
                              : 'bg-[#1a1a1a] text-white rounded-bl-sm border border-white/10'
                            }
                          `}
                        >
                          <p className="leading-relaxed break-words">{message.content}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <p className={`text-xs ${message.isOwn ? 'text-white/70' : 'text-gray-400'}`}>
                              {message.timestamp}
                            </p>
                            {message.isOwn && getMessageStatusIcon(message.status)}
                          </div>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#1a1a1a] border-white/10 text-white">
                        <DropdownMenuItem className="hover:bg-white/5">
                          <Reply size={16} className="mr-2" />
                          Répondre
                        </DropdownMenuItem>
                        <DropdownMenuItem className="hover:bg-white/5">
                          <Copy size={16} className="mr-2" />
                          Copier
                        </DropdownMenuItem>
                        {message.isOwn && (
                          <DropdownMenuItem 
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-red-500 hover:bg-red-500/10"
                          >
                            <Trash2 size={16} className="mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Scroll to Bottom Button */}
            <AnimatePresence>
              {showScrollButton && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="absolute bottom-4 right-4 z-10"
                >
                  <Button
                    onClick={() => scrollToBottom(true)}
                    size="icon"
                    className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#FF6B35]/90 hover:to-[#F7931E]/90 text-white shadow-lg h-10 w-10"
                  >
                    <ArrowDown size={20} />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10 bg-[#0A0A0A]/50 backdrop-blur-xl flex-shrink-0">
            {selectedConv.typing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-2 flex items-center gap-2 text-sm text-gray-400"
              >
                <div className="flex gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="w-2 h-2 bg-[#FF6B35] rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                    className="w-2 h-2 bg-[#FF6B35] rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                    className="w-2 h-2 bg-[#FF6B35] rounded-full"
                  />
                </div>
                <span>{selectedConv.name} est en train d'écrire...</span>
              </motion.div>
            )}

            <div className="flex items-end gap-2">
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-white/5 text-gray-400 hover:text-white flex-shrink-0"
                      >
                        <Paperclip size={20} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Joindre un fichier</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full hover:bg-white/5 text-gray-400 hover:text-white flex-shrink-0"
                      >
                        <ImageIcon size={20} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Envoyer une image</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex-1 relative">
                <Input
                  placeholder="Tapez votre message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pr-12 bg-[#1a1a1a] border-white/10 text-white placeholder:text-gray-500 focus:border-[#FF6B35] rounded-full"
                />
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white"
                      >
                        <Smile size={20} />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ajouter un emoji</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="rounded-full bg-gradient-to-r from-[#FF6B35] to-[#F7931E] hover:from-[#FF6B35]/90 hover:to-[#F7931E]/90 text-white disabled:opacity-50 disabled:cursor-not-allowed h-10 w-10 p-0 flex-shrink-0"
              >
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#0A0A0A]">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#FF6B35]/20 to-[#F7931E]/20 flex items-center justify-center">
              <Send size={32} className="text-[#FF6B35]" />
            </div>
            <p className="text-white mb-2">Sélectionnez une conversation</p>
            <p className="text-gray-400 text-sm">Choisissez une conversation pour commencer à discuter</p>
          </div>
        </div>
      )}
      
      {/* Confirm Dialog */}
      <ConfirmDialog />
    </div>
  );
}
