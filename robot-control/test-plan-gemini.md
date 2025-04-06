
Okay, oto szczegółowy plan testów dla projektu robot-control, opracowany na podstawie dostarczonych plików i struktury projektu:

Plan Testów dla Projektu Robot-Control
1. Wprowadzenie
Cel planu testów

Głównym celem tego planu jest zapewnienie wysokiej jakości aplikacji robot-control poprzez systematyczne i kompleksowe testowanie. Plan ma na celu weryfikację, czy aplikacja spełnia zdefiniowane wymagania funkcjonalne i niefunkcjonalne, ze szczególnym uwzględnieniem poprawnego działania wizualizacji 3D robota, mechanizmów sterowania oraz ogólnej użyteczności i wydajności interfejsu użytkownika.

Zakres testowania

Testowanie obejmie następujące obszary aplikacji robot-control bazującej na Next.js, React i Three.js:

Interfejs użytkownika (UI): Testowanie komponentów React (ControlButtons, RobotVisualization, page.tsx), responsywności, stylizacji Tailwind CSS (w tym niestandardowych animacji i motywu neonowego).

Wizualizacja 3D: Weryfikacja poprawnego renderowania sceny Three.js, modelu robota (zgodnie ze stanem aplikacji), działania kontrolek kamery (OrbitControls), efektów post-processingu (Bloom) oraz elementów pomocniczych (siatka, osie).

Logika sterowania robotem: Testowanie mechanizmu aktualizacji stanu robota (robotReducer), poprawności działania przycisków sterujących i ich wpływu na stan oraz wizualizację.

Zarządzanie stanem: Weryfikacja logiki reduktora (robotReducer w lib/robot.ts) i przepływu stanu w aplikacji (useReducer w page.tsx).

Wydajność: Ocena wydajności renderowania sceny 3D (FPS), czasu ładowania aplikacji i responsywności interfejsu.

Podstawowa dostępność i użyteczność: Sprawdzenie podstawowej nawigacji klawiaturą i kontrastu kolorów (szczególnie w kontekście motywu neonowego).

Zgodność między przeglądarkami: Weryfikacja działania aplikacji w najnowszych wersjach popularnych przeglądarek.

Poza zakresem (na podstawie analizy kodu):

Testowanie API (brak tRPC/backendu w dostarczonym kodzie).

Testowanie bazy danych (brak Prisma/bazy danych).

Testowanie uwierzytelniania i autoryzacji (brak NextAuth).

Testowanie zaawansowanych przepływów użytkownika (obecny zakres jest ograniczony).

2. Strategia testowania
Podejście do testowania

Testowanie zwinne: Testy będą tworzone i wykonywane równolegle z rozwojem, w krótkich iteracjach.

Testowanie oparte na komponentach: Silny nacisk na testowanie izolowanych komponentów React oraz ich integracji.

Automatyzacja: Dążenie do wysokiego poziomu automatyzacji testów jednostkowych, komponentowych i E2E, aby zapewnić szybką informację zwrotną i umożliwić testy regresji.

Testowanie manualne eksploracyjne: Uzupełnienie testów automatycznych o sesje eksploracyjne, szczególnie w obszarze wizualizacji 3D i użyteczności.

Testowanie wizualne: Wykorzystanie testów regresji wizualnej do weryfikacji poprawności renderowania UI i sceny 3D.

Typy testów

Testy jednostkowe (Unit Tests):

Cel: Weryfikacja poprawności działania izolowanych fragmentów kodu, głównie czystych funkcji.

Zakres: Testowanie logiki robotReducer (lib/robot.ts) - wszystkie akcje i przypadki brzegowe. Ewentualne funkcje pomocnicze.

Narzędzia: Jest / Vitest (do dodania do projektu), React Testing Library (do dodania).

Testy komponentów (Component Tests):

Cel: Testowanie pojedynczych komponentów React w izolacji, weryfikacja ich renderowania i interakcji.

Zakres:

ControlButtons: Renderowanie przycisków dla każdej osi, weryfikacja wywoływania dispatch z poprawnymi akcjami po kliknięciu.

RobotVisualization: Podstawowe renderowanie, weryfikacja przekazywania stanu, ewentualne testowanie na poziomie hooków Three.js (jeśli zostaną wyodrębnione). Bez głębokiej weryfikacji samej sceny 3D.

page.tsx: Renderowanie głównych bloków, integracja ControlButtons i RobotVisualization, inicjalizacja stanu.

Narzędzia: React Testing Library + Jest/Vitest (do dodania), ewentualnie Storybook do izolacji i dokumentacji wizualnej komponentów (do dodania).

Testy End-to-End (E2E):

Cel: Symulacja interakcji użytkownika z aplikacją w przeglądarce, weryfikacja kompletnych przepływów.

Zakres:

Załadowanie strony.

Kliknięcie przycisków sterujących i weryfikacja (wizualna lub poprzez sprawdzenie stanu/atrybutów) aktualizacji modelu 3D.

Interakcja z kontrolkami kamery (OrbitControls) - zoom, obrót.

Sprawdzenie responsywności podstawowego układu.

Narzędzia: Playwright / Cypress (do dodania).

Testy regresji wizualnej (Visual Regression Testing):

Cel: Wykrywanie niezamierzonych zmian wizualnych w UI i scenie 3D.

Zakres: Porównywanie zrzutów ekranu kluczowych widoków (cała strona, sam komponent RobotVisualization w różnych stanach) z wersjami bazowymi.

Narzędzia: Zintegrowane z Playwright/Cypress lub dedykowane narzędzia (np. Percy, Chromatic - do rozważenia).

Testy wydajnościowe (Frontend):

Cel: Ocena płynności animacji 3D i ogólnej responsywności aplikacji.

Zakres: Pomiar FPS podczas interakcji z modelem 3D, analiza wykorzystania zasobów (CPU/GPU/pamięć) przez scenę Three.js. Pomiar Core Web Vitals.

Narzędzia: Narzędzia deweloperskie przeglądarki (Performance tab, FPS meter), biblioteki typu stats.js (do dodania), WebPageTest / Lighthouse dla Core Web Vitals.

Testy dostępności (Accessibility Tests):

Cel: Zapewnienie podstawowego poziomu dostępności.

Zakres: Sprawdzenie nawigacji klawiaturą, kontrastu kolorów (szczególnie dla elementów neonowych), semantyki HTML.

Narzędzia: axe-core (można zintegrować z testami E2E), rozszerzenia przeglądarki (axe DevTools, WAVE).

Testy zgodności (Cross-Browser Testing):

Cel: Zapewnienie spójnego działania i wyglądu w różnych przeglądarkach.

Zakres: Wykonanie kluczowych scenariuszy E2E i weryfikacja wizualna na docelowych przeglądarkach.

Narzędzia: Manualne testy na różnych przeglądarkach lub usługi chmurowe (BrowserStack, LambdaTest - do rozważenia).

Narzędzia testowe (proponowane do dodania i konfiguracji):

Test Runner / Framework: Jest lub Vitest

Biblioteka do testowania React: React Testing Library (@testing-library/react, @testing-library/jest-dom)

Testy E2E / Wizualne: Playwright lub Cypress

CI/CD: GitHub Actions (wymaga konfiguracji workflow do uruchamiania testów)

Linting: ESLint (już skonfigurowany)

Monitorowanie wydajności: Narzędzia deweloperskie przeglądarki, ewentualnie stats.js.

3. Środowisko testowe
Wymagania sprzętowe i programowe

Stacje robocze testerów/deweloperów: Standardowy komputer deweloperski z aktualną wersją Node.js (zgodną z projektem) i/lub Bun, przeglądarki (Chrome, Firefox, Safari, Edge). Karta graficzna wspierająca WebGL 2.0 do testowania wizualizacji 3D.

Przeglądarki: Najnowsze wersje Chrome, Firefox, Safari, Edge.

System operacyjny: Windows, macOS, Linux (dla deweloperów/testerów).

Konfiguracja środowiska

Środowisko deweloperskie (lokalne): Uruchamiane za pomocą bun dev lub npm run dev. Używane do tworzenia kodu i testów jednostkowych/komponentowych.

Środowisko CI (Continuous Integration): GitHub Actions. Skonfigurowane do automatycznego uruchamiania lintowania, testów jednostkowych, komponentowych i E2E przy każdym pushu do repozytorium lub pull requeście. Wymaga instalacji zależności i konfiguracji kroków testowych.

Środowisko testowe/stagingowe: Automatyczne buildy preview na Vercel przy każdym pull requeście lub pushu do gałęzi deweloperskiej. Używane do testów E2E, wizualnych, eksploracyjnych i akceptacyjnych.

Środowisko produkcyjne: Vercel.

4. Przypadki testowe
Moduł wizualizacji 3D (RobotVisualization.tsx)

[TC-VIS-01] Poprawne renderowanie inicjalnej sceny 3D (Priorytet: Krytyczny)

Kroki: Otwórz aplikację.

Oczekiwany rezultat: Scena 3D jest widoczna. Widoczna jest siatka pomocnicza (GridHelper). Robot (początkowo 2 segmenty) jest widoczny w pozycji początkowej (zgodnej z initialState). Efekty neonowe/bloom są widoczne. Brak błędów w konsoli przeglądarki związanych z WebGL/Three.js.

[TC-VIS-02] Poprawna aktualizacja modelu robota po zmianie stanu (Priorytet: Krytyczny)

Kroki: 1. Otwórz aplikację. 2. Kliknij przycisk "+" dla Osi 1. 3. Obserwuj model robota. 4. Kliknij przycisk "-" dla Osi 2. 5. Obserwuj model robota.

Oczekiwany rezultat: Po kroku 2, pierwszy segment robota obraca się wizualnie zgodnie ze zwiększonym kątem. Po kroku 4, drugi segment robota obraca się wizualnie (względem końca pierwszego segmentu) zgodnie ze zmniejszonym kątem. Zmiany są płynne. Wygląd segmentów (geometria, materiały, efekty wireframe/glow) jest zgodny ze specyfikacją.

[TC-VIS-03] Działanie kontrolek kamery (OrbitControls) (Priorytet: Wysoki)

Kroki: 1. Otwórz aplikację. 2. Użyj myszy (lewy przycisk + przeciąganie), aby obracać widokiem. 3. Użyj kółka myszy, aby przybliżać/oddalać widok. 4. Użyj myszy (prawy przycisk + przeciąganie lub środkowy przycisk + przeciąganie), aby przesuwać widok (pan).

Oczekiwany rezultat: Obracanie, przybliżanie/oddalanie i przesuwanie widoku działa płynnie i intuicyjnie. Istnieją ograniczenia (minimalna/maksymalna odległość, kąt polarny), które działają poprawnie.

[TC-VIS-04] Wydajność renderowania 3D (Priorytet: Wysoki)

Kroki: 1. Otwórz aplikację. 2. Włącz monitor FPS w narzędziach deweloperskich. 3. Obracaj i zoomuj widok. 4. Klikaj przyciski sterujące, aby animować robota.

Oczekiwany rezultat: FPS utrzymuje się na akceptowalnym poziomie (np. > 30 FPS, do ustalenia) podczas interakcji. Brak znaczących spadków płynności.

[TC-VIS-05] Testy regresji wizualnej sceny 3D (Priorytet: Wysoki)

Kroki: Uruchom zautomatyzowane testy wizualne porównujące zrzuty ekranu komponentu RobotVisualization w różnych stanach (różne kąty osi) z obrazami bazowymi.

Oczekiwany rezultat: Brak niezamierzonych różnic wizualnych w renderowaniu robota, oświetlenia, efektów i tła.

Moduł sterowania robotem (ControlButtons.tsx + lib/robot.ts)

[TC-CTRL-01] Poprawne działanie przycisków zwiększania kąta osi (Priorytet: Krytyczny)

Kroki: 1. Otwórz aplikację. 2. Sprawdź początkowy stan kątów (np. w React DevTools lub logując stan). 3. Kliknij przycisk "+" dla Osi 1. 4. Sprawdź zaktualizowany stan kąta Osi 1. 5. Powtórz dla Osi 2.

Oczekiwany rezultat: Po kliknięciu "+", odpowiedni kąt w stanie aplikacji (state.axes[index]) zwiększa się o oczekiwaną wartość (delta, np. 0.1 - zgodnie z ControlButtons.tsx). Stan innych osi pozostaje niezmieniony. Zmiana stanu powoduje re-render RobotVisualization.

[TC-CTRL-02] Poprawne działanie przycisków zmniejszania kąta osi (Priorytet: Krytyczny)

Kroki: Analogicznie do TC-CTRL-01, ale używając przycisków "-".

Oczekiwany rezultat: Po kliknięciu "-", odpowiedni kąt w stanie aplikacji (state.axes[index]) zmniejsza się o oczekiwaną wartość (delta).

[TC-CTRL-03] Testowanie logiki robotReducer (testy jednostkowe) (Priorytet: Krytyczny)

Kroki: Uruchom testy jednostkowe dla funkcji robotReducer.

Oczekiwany rezultat: Wszystkie testy jednostkowe przechodzą, pokrywając akcje MOVE_AXIS (dla obu osi, wartości dodatnie i ujemne delta) oraz ewentualne inne akcje (np. SET_AXIS_PARAMS, jeśli byłaby używana). Testy weryfikują poprawność nowego stanu zwracanego przez reducer dla różnych stanów wejściowych i akcji.

Interfejs Użytkownika (UI) i Ogólne

[TC-UI-01] Poprawne renderowanie interfejsu użytkownika (Priorytet: Wysoki)

Kroki: Otwórz aplikację.

Oczekiwany rezultat: Widoczny jest tytuł "ROBOT CONTROL SYSTEM". Panel wizualizacji i panel kontrolny są poprawnie rozmieszczone (grid). Przyciski sterujące są widoczne i opisane. Stylizacja neonowa (kolory, czcionki, efekty glow, scanline, flicker) jest zastosowana zgodnie z tailwind.config.ts i globals.css.

[TC-UI-02] Responsywność układu (Priorytet: Średni)

Kroki: 1. Otwórz aplikację. 2. Zmień rozmiar okna przeglądarki (od szerokości mobilnej do desktopowej). 3. Sprawdź na orientacji poziomej i pionowej (jeśli dotyczy).

Oczekiwany rezultat: Układ strony dostosowuje się do różnych szerokości ekranu (np. przejście z układu jednokolumnowego na dwukolumnowy zgodnie z md:grid-cols-2). Elementy nie nakładają się, tekst jest czytelny. Wizualizacja 3D skaluje się poprawnie w swoim kontenerze.

[TC-UI-03] Zgodność między przeglądarkami (Priorytet: Średni)

Kroki: Wykonaj kluczowe przypadki testowe (np. TC-VIS-01, TC-VIS-02, TC-CTRL-01) na najnowszych wersjach Chrome, Firefox, Safari, Edge.

Oczekiwany rezultat: Aplikacja działa i wygląda spójnie we wszystkich testowanych przeglądarkach. Wizualizacja 3D renderuje się poprawnie.

[TC-UI-04] Podstawowa dostępność (Priorytet: Niski)

Kroki: 1. Spróbuj nawigować po interfejsie używając tylko klawiatury (Tab, Shift+Tab, Enter/Spacja). 2. Sprawdź kontrast kolorów tekstu i tła (szczególnie dla neonowych barw). 3. Użyj narzędzia do automatycznej weryfikacji dostępności (np. axe).

Oczekiwany rezultat: Możliwość dotarcia i aktywacji wszystkich interaktywnych elementów (przycisków) za pomocą klawiatury. Kontrast jest wystarczający dla podstawowej czytelności. Automatyczne skanowanie nie wykazuje krytycznych błędów WCAG.

5. Harmonogram testów

Zakładając rozpoczęcie prac nad testowaniem równolegle z finalizacją podstawowej funkcjonalności:

Tydzień 1:

Konfiguracja środowiska testowego (instalacja zależności: Jest/Vitest, RTL, Playwright).

Konfiguracja podstawowego workflow CI (GitHub Actions) do uruchamiania lintowania.

Implementacja pierwszych testów jednostkowych dla robotReducer.

Wstępne testy eksploracyjne aplikacji.

Tydzień 2:

Implementacja testów komponentów dla ControlButtons i page.tsx (RTL).

Implementacja podstawowych testów E2E (ładowanie strony, podstawowa interakcja) z Playwright.

Konfiguracja CI do uruchamiania testów jednostkowych i komponentowych.

Tydzień 3:

Implementacja bardziej złożonych testów E2E (weryfikacja zmian wizualnych po kliknięciach, testowanie OrbitControls).

Konfiguracja i implementacja testów regresji wizualnej dla RobotVisualization.

Konfiguracja CI do uruchamiania testów E2E i wizualnych.

Tydzień 4:

Testy wydajnościowe (manualne z DevTools, ewentualnie skrypty).

Testy zgodności między przeglądarkami (manualne lub z użyciem usług).

Testy dostępności (manualne + automatyczne skanowanie).

Sesja testów eksploracyjnych.

Raportowanie końcowe, retesty błędów.

Szacowany czas trwania: Około 4 tygodni (może być krótszy ze względu na obecny, ograniczony zakres projektu).

6. Role i odpowiedzialności

Inżynier QA / Tester:

Odpowiedzialność: Projektowanie, implementacja i wykonywanie testów (wszystkich typów), konfiguracja narzędzi testowych i CI dla testów, raportowanie błędów, tworzenie raportów z testów, testy eksploracyjne.

Deweloper(rzy):

Odpowiedzialność: Poprawa błędów zgłoszonych przez QA, wsparcie w konfiguracji środowiska, ewentualne pisanie testów jednostkowych/komponentowych dla tworzonych przez siebie fragmentów kodu, przeglądanie testów.

W małym zespole te role mogą się częściowo pokrywać.

7. Raportowanie i dokumentacja
Format raportów z testów

Raporty z wykonania testów automatycznych: Generowane automatycznie przez narzędzia (np. Jest/Vitest, Playwright) i dostępne w wynikach działania CI (np. w GitHub Actions). Powinny zawierać listę wykonanych testów, status (pass/fail), czas trwania, ewentualne logi błędów/zrzuty ekranu dla nieudanych testów E2E/wizualnych.

Raport z błędów: Każdy znaleziony błąd powinien być zgłoszony w systemie śledzenia błędów (np. GitHub Issues). Raport powinien zawierać:

Tytuł (jasno opisujący problem).

Opis (szczegółowy opis błędu).

Kroki do reprodukcji (numerowane, precyzyjne).

Wynik oczekiwany.

Wynik aktualny.

Środowisko (przeglądarka, system operacyjny, wersja aplikacji/build).

Priorytet/Waga (np. Krytyczny, Wysoki, Średni, Niski).

Zrzuty ekranu/Wideo (jeśli dotyczy).

Podsumowanie testów (np. tygodniowe/końcowe): Krótki raport statusu zawierający postęp prac testowych, liczbę wykonanych testów (manualnych/automatycznych), liczbę znalezionych/zamkniętych błędów, zidentyfikowane ryzyka, ogólną ocenę jakości.

Proces śledzenia błędów

Zgłoszenie: Tester (lub deweloper) zgłasza błąd w GitHub Issues, wypełniając wszystkie wymagane pola.

Triage/Klasyfikacja: Zespół (np. QA + Lead Dev) przegląda zgłoszenie, potwierdza jego ważność, ustala priorytet i przypisuje do dewelopera.

Naprawa: Deweloper naprawia błąd i oznacza zgłoszenie jako gotowe do weryfikacji (np. poprzez zamknięcie powiązanego Pull Requesta).

Weryfikacja: Tester weryfikuje poprawkę na odpowiednim środowisku (np. Vercel preview build lub środowisko deweloperskie).

Zamknięcie/Otwarcie Ponowne: Jeśli błąd został poprawnie naprawiony, tester zamyka zgłoszenie. Jeśli nie, tester otwiera je ponownie, dodając komentarz wyjaśniający.

Testy regresji: Automatyczne testy regresji (jednostkowe, komponentowe, E2E, wizualne) są uruchamiane w CI, aby upewnić się, że poprawka nie wprowadziła nowych błędów.

8. Kryteria akceptacji i zakończenia testów
Kryteria akceptacji (Wyjściowe)

Funkcjonalność: Wszystkie zdefiniowane przypadki testowe dla krytycznych i wysokich priorytetów zostały wykonane i zakończyły się sukcesem.

Błędy: Brak otwartych błędów o priorytecie Krytycznym i Wysokim. Wszystkie błędy Średnie i Niskie są przeanalizowane, a decyzje o ich naprawie (lub odłożeniu) podjęte.

Testy automatyczne: Wszystkie testy jednostkowe, komponentowe i E2E w zestawie regresji przechodzą pomyślnie w środowisku CI.

Testy wizualne: Wszystkie testy regresji wizualnej przechodzą pomyślnie lub zmiany zostały świadomie zaakceptowane jako nowe linie bazowe.

Wydajność: Wydajność renderowania 3D spełnia ustalone kryteria (np. średnie FPS > 30 na docelowym sprzęcie/przeglądarce). Core Web Vitals są w akceptowalnych zakresach.

Zgodność: Aplikacja działa poprawnie na wszystkich zdefiniowanych docelowych przeglądarkach.

Kryteria zakończenia testów (Zakończenia fazy)

Wszystkie kryteria akceptacji zostały spełnione.

Plan testów został w pełni zrealizowany (wszystkie zaplanowane działania testowe zostały wykonane).

Końcowy raport z testów został przygotowany i zaakceptowany przez interesariuszy (np. Product Ownera, Lead Dewelopera).

Wszystkie zgłoszone błędy zostały rozwiązane (naprawione lub świadomie zaakceptowane jako dług techniczny/do naprawy w przyszłości).

9. Ryzyka i plan łagodzenia ryzyk
Zidentyfikowane ryzyka

Problemy z wydajnością renderowania 3D (Three.js): Duża liczba obiektów, skomplikowane shadery lub efekty post-processingu mogą prowadzić do niskiego FPS i słabego doświadczenia użytkownika.

Łagodzenie: Wczesne i regularne testy wydajnościowe, profilowanie sceny 3D za pomocą narzędzi deweloperskich, optymalizacja geometrii/materiałów, rozważne używanie post-processingu, testowanie na reprezentatywnym sprzęcie.

Trudności w automatyzacji testów wizualnych 3D: Weryfikacja poprawności złożonej sceny 3D za pomocą automatycznych testów jest wyzwaniem (oświetlenie, kąty kamery, dynamiczne elementy).

Łagodzenie: Skupienie testów automatycznych na stanie danych napędzających wizualizację (RobotState), użycie testów regresji wizualnej dla statycznych ujęć sceny, uzupełnienie testami manualnymi/eksploracyjnymi.

Niespójności między przeglądarkami (WebGL/CSS): Różne implementacje WebGL i silników CSS mogą powodować różnice w wyglądzie i działaniu.

Łagodzenie: Regularne testowanie na docelowych przeglądarkach (manualne lub z użyciem usług chmurowych), stosowanie sprawdzonych technik CSS i WebGL, sprawdzanie wsparcia funkcji na caniuse.com.

Błędy w logice zarządzania stanem (robotReducer): Błędy w reducerze mogą prowadzić do nieprzewidywalnego stanu aplikacji i nieprawidłowej wizualizacji.

Łagodzenie: Dokładne testy jednostkowe reducera pokrywające wszystkie akcje i przypadki brzegowe, użycie TypeScript do typowania stanu i akcji.

Brak infrastruktury testowej na początku: Projekt nie zawiera obecnie żadnych bibliotek ani konfiguracji do testowania.

Łagodzenie: Zaplanowanie czasu na początku projektu na konfigurację narzędzi (Jest/Vitest, RTL, Playwright) i CI (GitHub Actions). Stopniowe dodawanie testów.

Problemy z dostępnością (neonowe kolory): Wybrane kolory neonowe mogą mieć niski kontrast, utrudniając korzystanie z aplikacji niektórym użytkownikom.

Łagodzenie: Weryfikacja współczynników kontrastu za pomocą narzędzi, zapewnienie alternatywnych wskaźników (np. obramowania) dla elementów interaktywnych, testowanie z użyciem narzędzi accessibility.