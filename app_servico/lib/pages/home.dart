import 'package:flutter/material.dart';

class TelaHome extends StatelessWidget {
  const TelaHome({super.key});

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final isTablet = width > 600;

    final double iconSize = isTablet ? 60 : 35;
    final double cardHeight = isTablet ? 180 : 120;
    final double cardWidth = isTablet ? 250 : 160;
    final double wideCardHeight = isTablet ? 100 : 70;
    final double fontSizeCard = isTablet ? 22 : 16;
    final double wideFont = isTablet ? 26 : 18;

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
                fontSize: 15,
              ),
            ),
          ],
        ),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 15),
            child: CircleAvatar(
              radius: isTablet ? 30 : 20,
              backgroundColor: const Color(0xFFEAE4FF),
              child: Icon(Icons.person, color: const Color(0xFF6A4DBA), size: isTablet ? 35 : 22),
            ),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              padding: EdgeInsets.all(isTablet ? 35 : 20),
              decoration: BoxDecoration(
                color: const Color(0xFFFFE3EC),
                borderRadius: BorderRadius.circular(25),
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
                    onPressed: () {},
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
                  )
                ],
              ),
            ),
            const SizedBox(height: 25),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildCard(
                  icon: Icons.calendar_month,
                  text: "Agendar horário",
                  color: const Color(0xFFE8DFFF),
                  iconSize: iconSize,
                  width: cardWidth,
                  height: cardHeight,
                  fontSize: fontSizeCard,
                ),
                _buildCard(
                  icon: Icons.access_time_filled,
                  text: "Meus agendamentos",
                  color: const Color(0xFFFFE4E4),
                  iconSize: iconSize,
                  width: cardWidth,
                  height: cardHeight,
                  fontSize: fontSizeCard,
                ),
              ],
            ),
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                _buildCard(
                  icon: Icons.content_cut,
                  text: "Nossos serviços",
                  color: const Color(0xFFFFF0DD),
                  iconSize: iconSize,
                  width: cardWidth,
                  height: cardHeight,
                  fontSize: fontSizeCard,
                ),
                _buildCard(
                  icon: Icons.person,
                  text: "Profissionais",
                  color: const Color(0xFFE7D9FF),
                  iconSize: iconSize,
                  width: cardWidth,
                  height: cardHeight,
                  fontSize: fontSizeCard,
                ),
              ],
            ),
            const SizedBox(height: 20),
            Center(
              child: _buildWideCard(
                icon: Icons.favorite,
                text: "Favoritos",
                color: const Color(0xFFFFE0E0),
                height: wideCardHeight,
                iconSize: iconSize - 10,
                fontSize: wideFont,
              ),
            ),
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

  Widget _buildCard({
    required IconData icon,
    required String text,
    required Color color,
    required double iconSize,
    required double width,
    required double height,
    required double fontSize,
  }) {
    return Container(
      width: width,
      height: height,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(22),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, size: iconSize, color: Colors.black87),
          const Spacer(),
          Text(
            text,
            style: TextStyle(fontSize: fontSize, fontWeight: FontWeight.w600),
          ),
        ],
      ),
    );
  }

  Widget _buildWideCard({
    required IconData icon,
    required String text,
    required Color color,
    required double height,
    required double iconSize,
    required double fontSize,
  }) {
    return Container(
      width: double.infinity,
      height: height,
      padding: const EdgeInsets.symmetric(horizontal: 25),
      decoration: BoxDecoration(
        color: color,
        borderRadius: BorderRadius.circular(22),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: iconSize, color: Colors.black87),
          const SizedBox(width: 15),
          Text(
            text,
            style: TextStyle(fontSize: fontSize, fontWeight: FontWeight.bold),
          ),
        ],
      ),
    );
  }
}
