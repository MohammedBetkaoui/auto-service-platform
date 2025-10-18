import { useState } from 'react';
import { Send, Search, Phone, Video, MoreVertical, Paperclip, Smile, Image as ImageIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type UserRole = 'client' | 'provider';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar?: string;
  online: boolean;
  role: 'client' | 'provider';
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  type: 'text' | 'image' | 'file';
}

interface MessagingProps {
  userRole: UserRole;
}

export function Messaging({ userRole }: MessagingProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConversation, setSelectedConversation] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      name: userRole === 'client' ? 'Ahmed Belkacem' : 'Ahmed Benali',
      lastMessage: 'J\'arrive dans 5 minutes',
      timestamp: 'il y a 2 min',
      unread: 2,
      online: true,
      role: userRole === 'client' ? 'provider' : 'client',
    },
    {
      id: '2',
      name: userRole === 'client' ? 'Karim Auto Service' : 'Fatima Meziane',
      lastMessage: 'Merci pour le service impeccable !',
      timestamp: 'il y a 1h',
      unread: 0,
      online: false,
      role: userRole === 'client' ? 'provider' : 'client',
    },
    {
      id: '3',
      name: userRole === 'client' ? 'Yacine Lavage Pro' : 'Karim Saidi',
      lastMessage: 'À quelle heure puis-je passer ?',
      timestamp: 'il y a 3h',
      unread: 1,
      online: true,
      role: userRole === 'client' ? 'provider' : 'client',
    },
    {
      id: '4',
      name: userRole === 'client' ? 'Salah Mécanique' : 'Amina Lahouel',
      lastMessage: 'Le devis est prêt',
      timestamp: 'Hier',
      unread: 0,
      online: false,
      role: userRole === 'client' ? 'provider' : 'client',
    },
  ];

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: '2',
      content: 'Bonjour, je confirme votre rendez-vous pour le lavage complet',
      timestamp: '10:30',
      isOwn: false,
      type: 'text',
    },
    {
      id: '2',
      senderId: '1',
      content: 'Parfait, merci ! À quelle heure pensez-vous arriver ?',
      timestamp: '10:32',
      isOwn: true,
      type: 'text',
    },
    {
      id: '3',
      senderId: '2',
      content: 'Je serai là vers 11h. Avez-vous un accès à l\'eau sur place ?',
      timestamp: '10:35',
      isOwn: false,
      type: 'text',
    },
    {
      id: '4',
      senderId: '1',
      content: 'Oui, pas de problème pour l\'eau. Je vous attends à 11h.',
      timestamp: '10:36',
      isOwn: true,
      type: 'text',
    },
    {
      id: '5',
      senderId: '2',
      content: 'Super ! Je suis en route maintenant.',
      timestamp: '10:50',
      isOwn: false,
      type: 'text',
    },
    {
      id: '6',
      senderId: '2',
      content: 'J\'arrive dans 5 minutes',
      timestamp: '10:55',
      isOwn: false,
      type: 'text',
    },
  ]);

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        senderId: '1',
        content: messageInput,
        timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        type: 'text',
      };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-12rem)] bg-white rounded-2xl shadow-sm overflow-hidden flex">
      {/* Conversations List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-200 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="search"
              placeholder="Rechercher une conversation..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 rounded-xl bg-[#F5F7FA] border-0"
            />
          </div>
        </div>

        {/* Conversations */}
        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`
                  w-full p-4 rounded-xl mb-2 transition-all text-left
                  ${selectedConversation === conv.id
                    ? 'bg-[#E6F2FF] border border-[#0077FF]/20'
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={conv.avatar} alt={conv.name} />
                      <AvatarFallback className="bg-[#0077FF] text-white">
                        {conv.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-[#1E1E1E] truncate">
                        {conv.name}
                      </p>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {conv.timestamp}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">
                        {conv.lastMessage}
                      </p>
                      {conv.unread > 0 && (
                        <Badge className="ml-2 bg-[#0077FF] text-white rounded-full h-5 w-5 flex items-center justify-center p-0 text-xs">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {selectedConv ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="" alt={selectedConv.name} />
                  <AvatarFallback className="bg-[#0077FF] text-white">
                    {selectedConv.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {selectedConv.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>
              <div>
                <p className="text-[#1E1E1E]">{selectedConv.name}</p>
                <p className="text-xs text-gray-500">
                  {selectedConv.online ? 'En ligne' : 'Hors ligne'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Phone size={20} className="text-gray-600" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Video size={20} className="text-gray-600" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <MoreVertical size={20} className="text-gray-600" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                  <DropdownMenuItem>Rechercher dans la conversation</DropdownMenuItem>
                  <DropdownMenuItem>Archiver</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Bloquer</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4 bg-[#F5F7FA]">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isOwn && (
                    <Avatar className="h-8 w-8 mr-2 flex-shrink-0">
                      <AvatarImage src="" alt={selectedConv.name} />
                      <AvatarFallback className="bg-[#0077FF] text-white text-xs">
                        {selectedConv.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`
                      max-w-[70%] rounded-2xl px-4 py-3
                      ${message.isOwn
                        ? 'bg-[#0077FF] text-white rounded-br-sm'
                        : 'bg-white text-[#1E1E1E] rounded-bl-sm'
                      }
                    `}
                  >
                    <p className="leading-relaxed break-words">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.isOwn ? 'text-white/70' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-end gap-2">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0">
                  <Paperclip size={20} className="text-gray-600" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full flex-shrink-0">
                  <ImageIcon size={20} className="text-gray-600" />
                </Button>
              </div>

              <div className="flex-1 relative">
                <Textarea
                  placeholder="Écrivez votre message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="min-h-[48px] max-h-32 resize-none rounded-xl pr-12"
                  rows={1}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 bottom-2 rounded-full"
                >
                  <Smile size={20} className="text-gray-600" />
                </Button>
              </div>

              <Button
                onClick={handleSendMessage}
                disabled={!messageInput.trim()}
                className="bg-[#0077FF] hover:bg-[#0066DD] text-white rounded-full h-12 w-12 flex-shrink-0"
                size="icon"
              >
                <Send size={20} />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-[#F5F7FA]">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl text-[#1E1E1E] mb-2">Sélectionnez une conversation</h3>
            <p className="text-gray-600">Choisissez une conversation pour commencer à discuter</p>
          </div>
        </div>
      )}
    </div>
  );
}
