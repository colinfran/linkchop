export const Form = ({ action, children }: { action: any; children: React.ReactNode }) => {
  return (
    <form action={action} className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16">
      <div>
        <label className="block text-xs uppercase text-gray-600" htmlFor="name">
          Name
        </label>
        <input
          autoComplete="name"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          id="name"
          name="name"
          placeholder="Jeff Jeffers"
          type="text"
          required
        />
      </div>
      <div>
        <label className="block text-xs uppercase text-gray-600" htmlFor="email">
          Email Address
        </label>
        <input
          autoComplete="email"
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          id="email"
          name="email"
          placeholder="user@acme.com"
          type="email"
          required
        />
      </div>
      <div>
        <label className="block text-xs uppercase text-gray-600" htmlFor="password">
          Password
        </label>
        <input
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 shadow-sm placeholder:text-gray-400 focus:border-black focus:outline-none focus:ring-black sm:text-sm"
          id="password"
          name="password"
          type="password"
          required
        />
      </div>
      {children}
    </form>
  )
}
