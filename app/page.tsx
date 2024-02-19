import Link from "next/link";

export default function Home() {
  return (
      <div className="hero mt-52">
          <div className="hero-content text-center">
              <div className="max-w-md">
                  <h1 className="text-5xl font-bold">Une alternative à <span className="text-primary">Celcatweb?</span></h1>
                  <p className="font-extralight py-6">Développée par <span
                      className="text-secondary font-light">Thibault MINNEBOO</span>,
                      étudiant en 2ème année de BUT Informatique. Cette
                      alternative open source est destinée à un usage légal. Vous trouverez le code source de ce projet
                      en suivant <a
                          href="https://github.com/ThibaultMINNEBOO/celcatweb" className="text-primary font-light hover:underline" target="_blank">ce</a> lien</p>
                  <Link href="/groups" className="btn btn-primary">Voir la liste des cours</Link>
              </div>
          </div>
      </div>
  );
}
