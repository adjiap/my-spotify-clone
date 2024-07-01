import Header from "@/components/header";
import ListItem from "@/components/listitem";

export default function Home() {
  return (
    <div className="
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
    ">
      <Header>
        <div className="mb-2">
          <h1 className="
            text-white
            text-3xl
            font-semibold
          ">
            Welcome back
          </h1>
          <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-3
            mt-4
          ">
            <ListItem 
              image="/images/liked.png"  // I'm not sure why yet, but this path seem to bypass the "public" folder. Does that mean that it's automatically considered?
              name="Liked Songs"
              href="liked"
            />
          </div>
        </div>
      </Header>
    </div>
  );
}