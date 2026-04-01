// 1. Child Component: Foto Profil (Menggunakan Image dari folder public)
function ProfilePic() {
    return (
        <div style={{ textAlign: 'center' }}>
            <img src="img/profile.jpg" alt="Foto Profil" style={{ width: '150px', borderRadius: '50%' }} />
        </div>
    );
}

// 2. Child Component: Header Nama
function HeaderName({ nama, nim }) {
    return (
        <div>
            <h1>{nama.toUpperCase()}</h1>
           
            <small>{nim}</small>
            <hr />
        </div>
    );
}

// 3. Child Component: Info Kontak (Menggunakan Props)
function ContactInfo({ email, telepon }) {
    return (
        <div>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Telepon:</strong> {telepon}</p>
        </div>
    );
}

// 4. Child Component: Deskripsi Diri
function AboutMe() {
    const bio = "Saya adalah pengembang web yang bersemangat belajar ReactJs.";
    return (
        <div>
            <h3>Tentang Saya</h3>
            <p>{bio}</p>
            <hr />
        </div>
    );
}

// 5. Child Component: Riwayat Pendidikan (Daftar)
function Education() {
    return (
        <div>
            <h3>Pendidikan</h3>
            <ul>
                <li>Mahasiswa Politeknik Caltex Riau Jurusan Sistem Informasi</li>
            </ul>
        </div>
    );
}

// 6. Child Component: Skill/Keahlian
function Skills() {
    return (
        <div>
            <hr />
            <p><strong>Keahlian:</strong> React, JavaScript, CSS, HTML</p>
        </div>
    );
}

// function User(props) {
//     return (
//         <div className="card">
//             <hr />
//             <p><strong>Nama:</strong> {props.nama}</p>
//             <p><strong>NIM:</strong> {props.nim}</p>
//             <p><strong>Email:</strong> {props.email}</p>
//             <p><strong>Telepon:</strong> {props.telepon}</p>
//         </div>
//     );
// }
    
// Parent Component: BiodataDiri
export default function BiodataDiri() {
    const dataDiri = {
        nama: "Nailah",
        nim :"2457301108",
        email: "nailah@example.com",
        telepon: "+62 812 3456 7890"
    };

    return (
        <div className="card"> {/* Menerapkan class card dari custom.css [cite: 751] */}
            <ProfilePic />
            {/* <BiodataDiri nama="Nailah" nim="2457301108" email="nailah@example.com" telepon="+62 812 3456 7890" /> */}
            <HeaderName nama={dataDiri.nama} nim={dataDiri.nim} />
            <ContactInfo email={dataDiri.email} telepon={dataDiri.telepon} />
            <AboutMe />
            <Education />
            <Skills />
        </div>
    );
}