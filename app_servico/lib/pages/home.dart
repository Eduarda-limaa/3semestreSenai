import 'package:app_servico/pages/profissionais.dart';
import 'package:flutter/material.dart';
import 'servico.dart'; 

class TelaHome extends StatelessWidget {
  const TelaHome({super.key});

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final isTablet = width > 600;

    return Scaffold(
      backgroundColor: const Color(0xFFFDFDFD),

      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        title: Column(
          children: const [
            Text(
              "JK Cilios",
              style: TextStyle(
                color: Color(0xFF333333),
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),
            Text(
              "Realce sua beleza",
              style: TextStyle(
                color: Colors.grey,
                fontSize: 15),
            ),
          ],
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 15),
            child: CircleAvatar(
              radius: isTablet ? 30 : 20,
              backgroundColor: const Color(0xFFEAE4FF),
              child: Icon(
                Icons.person,
                color: Color(0xFF6A4DBA),
                size: isTablet ? 35 : 22,
              ),
            ),
          ),
        ],
      ),

      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildBannerSuperior(isTablet),
            const SizedBox(height: 25),

            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: isTablet ? 3 : 2,
              crossAxisSpacing: 20,
              mainAxisSpacing: 20,
              childAspectRatio: isTablet ? 1.2 : 1,
              children: [
                _buildStyledCard(
                  Icons.calendar_month,
                  "Agendar horário",
                  onPressed: () {
                    print("Abrir tela de Agendar Horário");
                  },
                ),

                _buildStyledCard(
                  Icons.access_time_filled,
                  "Meus agendamentos",
                  onPressed: () {
                    print("Abrir tela Meus Agendamentos");
                  },
                ),

                _buildStyledCard(
                  Icons.content_cut,
                  "Nossos serviços",
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const TelaServicos(),
                      ),
                    );
                  },
                ),

                _buildStyledCard(
                  Icons.person,
                  "Profissionais",
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) => const TelaProfissionais(),
                      ),
                    );
                  },
                ),
              ],
            ),

            const SizedBox(height: 25),

            _buildHeroAgendamento(isTablet),
          ],
        ),
      ),

      bottomNavigationBar: BottomNavigationBar(
        selectedItemColor: const Color(0xFF6A4DBA),
        unselectedItemColor: Colors.grey,
        iconSize: isTablet ? 40 : 24,
        selectedFontSize: isTablet ? 20 : 14,
        unselectedFontSize: isTablet ? 18 : 12,
        items: const [
          BottomNavigationBarItem(icon: Icon(Icons.home), label: "Home"),
          BottomNavigationBarItem(icon: Icon(Icons.add_box_rounded), label: "Agendar"),
          BottomNavigationBarItem(icon: Icon(Icons.person), label: "Perfil"),
        ],
      ),
    );
  }


  Widget _buildBannerSuperior(bool isTablet) {
    return Container(
      height: isTablet ? 340 : 260,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(25),
        image: const DecorationImage(
          image: AssetImage("assets/images/banner.jpg"),
          fit: BoxFit.cover,
        ),
      ),
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(25),
          gradient: LinearGradient(
            colors: [
              const Color(0xFF8E4DC4).withOpacity(0.15),
              const Color(0xFF8E4DC4).withOpacity(0.4),
            ],
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
          ),
        ),
      ),
    );
  }


  Widget _buildHeroAgendamento(bool isTablet) {
    return Container(
      padding: EdgeInsets.all(isTablet ? 35 : 25),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(30),
        gradient: const LinearGradient(
          colors: [
            Color(0xFFFFE3EC),
            Color(0xFFFFD8E7),
          ],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black12,
            blurRadius: 12,
            offset: Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          Text(
            "Agende seu horário",
            style: TextStyle(
              fontSize: isTablet ? 34 : 22,
              fontWeight: FontWeight.bold,
              color: const Color(0xFF333333),
            ),
          ),
          const SizedBox(height: 10),
          ElevatedButton(
            onPressed: () {
              print("Abrir tela de Agendar");
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFB18CFF),
              padding: EdgeInsets.symmetric(
                horizontal: isTablet ? 60 : 35,
                vertical: isTablet ? 20 : 12,
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15),
              ),
            ),
            child: Text(
              "Agendar",
              style: TextStyle(
                fontSize: isTablet ? 24 : 16,
                color: Colors.white,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStyledCard(IconData icon, String text, {VoidCallback? onPressed}) {
    return InkWell(
      borderRadius: BorderRadius.circular(25),
      onTap: onPressed,
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(25),
          gradient: const LinearGradient(
            colors: [
              Color(0xFFF8F3FF),
              Color(0xFFEDE4FF),
            ],
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.black12,
              blurRadius: 10,
              offset: Offset(0, 4),
            ),
          ],
        ),
        child: Center(
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(icon, size: 50, color: Color(0xFF6A4DBA)),
              const SizedBox(height: 15),
              Text(
                text,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF333333),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
