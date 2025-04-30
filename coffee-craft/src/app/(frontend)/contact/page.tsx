import FormContact from "@/components/Contact/FormContact";
import HeroContact from "@/components/Contact/HeroContact";
import React from "react";

export default function page() {
  return (
    <section className="py-3">
      <div className="text-center space-y-5">
        <h1 className="text-5xl font-bold">Liện hệ</h1>
        <p className="text-base border-t-8 inline-block rounded-md border-slate-200 pt-5 ">
          Bất kỳ thắc mắc hay cần sự hỗ trợ, hãy liên hệ với Craft bằng <br />{" "}
          cách tiện cho bạn nhất dưới đây:
        </p>
      </div>
      <FormContact />
      <HeroContact />
    </section>
  );
}
