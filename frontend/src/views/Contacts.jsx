import { useEffect } from "react";

function Contacts() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <div>Page Contacts</div>;
}

export default Contacts;
