export default function ProfilePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 pb-24">
      <main className="flex flex-col items-center gap-6 p-8">
        <h1 className="text-4xl font-bold text-[#008D80]">Профиль</h1>
        <p className="text-lg text-zinc-600 text-center max-w-md">
          Информация о вашем профиле и настройки аккаунта.
        </p>
      </main>
    </div>
  );
}
