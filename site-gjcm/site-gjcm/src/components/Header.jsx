import styles from "./Header.module.css"

export function Header(){
    return(
        <div>
            <div id={styles.logo}>
                <img src="logoGJCM.png" alt="logo-gjcm" />
                <h1>GJCM</h1>
            </div>
            <h2>Grupo de Jovens - Coração Mariano</h2>
        </div>
    )
}