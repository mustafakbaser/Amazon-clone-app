import { User } from '@/lib/types/auth';

interface AccountInfoProps {
  user: User;
}

export function AccountInfo({ user }: AccountInfoProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-muted-foreground">Ad</label>
          <p className="text-lg">{user.firstName}</p>
        </div>
        
        <div>
          <label className="text-sm font-medium text-muted-foreground">Soyad</label>
          <p className="text-lg">{user.lastName}</p>
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground">E-posta</label>
        <p className="text-lg">{user.email}</p>
      </div>

      <div>
        <label className="text-sm font-medium text-muted-foreground">Üyelik Tarihi</label>
        <p className="text-lg">
          {new Date(user.createdAt).toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}