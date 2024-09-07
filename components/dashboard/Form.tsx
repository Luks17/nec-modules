import type React from "react";

interface SectionsProps {
  children?: React.ReactNode;
  currentSection: number;
  sections: readonly { label: string }[];
}

interface FormProps {
  children?: React.ReactNode;
}

interface SubmitWithSectionsProps {
  currentSection: number;
  sectionsNumber: number;
  changeSection: (
    e: React.MouseEvent<HTMLButtonElement>,
    next: boolean
  ) => void;
}

function Sections({ children, currentSection, sections }: SectionsProps) {
  return (
    <div className="w-full bg-base-200 rounded-box form-control lg:grid lg:grid-cols-4">
      <div className="lg:col-span-3">{children}</div>
      <ul
        className="steps lg:steps-vertical border-8 border-base-200 bg-secondary max-lg:rounded-t-2xl 
        lg:rounded-r-2xl px-10 py-16 text-sm sm:text-lg lg:col-span-1"
      >
        {sections.map((section, i) => (
          <li
            key={i}
            className={`step text-secondary-content ${currentSection >= i && "step-accent"}`}
          >
            {section.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Form(props: FormProps & React.FormHTMLAttributes<HTMLFormElement>) {
  return <form {...props}>{props.children}</form>;
}

function Submit() {
  return (
    <div className="w-full flex my-5 justify-center">
      <button className="btn btn-accent w-fit" type="submit">
        Confirmar
      </button>
    </div>
  );
}

function SubmitWithSections({
  currentSection,
  changeSection,
  sectionsNumber,
}: SubmitWithSectionsProps) {
  return (
    <div className="w-full flex gap-x-5 my-5 justify-center">
      <button
        className="btn btn-outline"
        onClick={(e) => changeSection(e, false)}
        disabled={currentSection === 0}
      >
        Previous
      </button>
      <button
        className="btn btn-outline"
        onClick={(e) => changeSection(e, true)}
        disabled={currentSection === sectionsNumber - 1}
      >
        Next
      </button>
      <button
        disabled={currentSection !== sectionsNumber - 1}
        className="btn btn-accent w-fit"
        type="submit"
      >
        Submit
      </button>
    </div>
  );
}

function Group({ children }: FormProps) {
  return (
    <div className="form-control sm:flex-row gap-x-4 gap-y-4">{children}</div>
  );
}

export default {
  Root: Form,
  SectionsWrapper: Sections,
  Submit,
  SubmitWithSections,
  Group,
};
