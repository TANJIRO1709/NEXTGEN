import { Wallet, Clock, Users, GraduationCap, FileText, Heart, Lock, Sparkles } from 'lucide-react';

export const getSchemeIcon = (iconName: string) => {
  switch (iconName) {
    case 'piggy-bank':
      return <Wallet className="w-5 h-5 text-blue-600" />;
    case 'refresh-cw':
      return <Clock className="w-5 h-5 text-blue-600" />;
    case 'clock':
      return <Clock className="w-5 h-5 text-blue-600" />;
    case 'calendar':
      return <Clock className="w-5 h-5 text-blue-600" />;
    case 'user':
      return <Users className="w-5 h-5 text-blue-600" />;
    case 'graduation-cap':
      return <GraduationCap className="w-5 h-5 text-blue-600" />;
    case 'certificate':
      return <FileText className="w-5 h-5 text-blue-600" />;
    case 'sprout':
      return <Heart className="w-5 h-5 text-blue-600" />;
    case 'user-heart':
      return <Heart className="w-5 h-5 text-blue-600" />;
    case 'shield':
      return <Lock className="w-5 h-5 text-blue-600" />;
    case 'heart-handshake':
      return <Heart className="w-5 h-5 text-blue-600" />;
    default:
      return <Sparkles className="w-5 h-5 text-blue-600" />;
  }
};
