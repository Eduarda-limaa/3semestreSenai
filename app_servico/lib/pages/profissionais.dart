import 'package:flutter/material.dart';

class TelaProfissionais extends StatelessWidget {
  const TelaProfissionais({super.key});

  @override
  Widget build(BuildContext context) {
    final width = MediaQuery.of(context).size.width;
    final isTablet = width > 600;

    return Scaffold(
      backgroundColor: const Color(0xFFFDFDFD),

      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Color(0xFF6A4DBA)),
          onPressed: () => Navigator.pop(context),
        ),
        title: const Text(
          "Profissionais",
          style: TextStyle(
            color: Color(0xFF333333),
            fontSize: 22,
            fontWeight: FontWeight.bold,
          ),
        ),
        centerTitle: true,
      ),

      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [

            const Text(
              "Nossas Especialistas",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: Color(0xFF6A4DBA),
              ),
            ),

            const SizedBox(height: 20),

            GridView.count(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              crossAxisCount: isTablet ? 3 : 2,
              crossAxisSpacing: 20,
              mainAxisSpacing: 20,
              childAspectRatio: isTablet ? 0.85 : 0.75,
              children: [
                _buildProfissionalCard(
                  "Gabriela Santos",
                  "Designer de Cílios",
                  "assets/images/pro1.jpg",
                ),
                _buildProfissionalCard(
                  "Juliana Rocha",
                  "Lash Master",
                  "assets/images/pro2.jpg",
                ),
                _buildProfissionalCard(
                  "Camila Andrade",
                  "Especialista em Volume",
                  "assets/images/pro3.jpg",
                ),
                _buildProfissionalCard(
                  "Larissa Melo",
                  "Extensão de Cílios",
                  "assets/images/pro4.jpg",
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  // -----------------------------
  // CARD BONITO DE PROFISSIONAL
  // -----------------------------
  Widget _buildProfissionalCard(String nome, String cargo, String foto) {
    return Container(
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
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const SizedBox(height: 10),

          // FOTO REDONDA
          CircleAvatar(
            radius: 45,
            backgroundImage: AssetImage(foto),
          ),

          const SizedBox(height: 12),

          Text(
            nome,
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: Color(0xFF333333),
              fontWeight: FontWeight.bold,
              fontSize: 17,
            ),
          ),

          const SizedBox(height: 5),

          Text(
            cargo,
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: Color(0xFF6A4DBA),
              fontSize: 14,
              fontWeight: FontWeight.w500,
            ),
          ),

          const SizedBox(height: 15),

          // botão agendar
          ElevatedButton(
            onPressed: () {
              print("Agendar com $nome");
            },
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFFB18CFF),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(15),
              ),
            ),
            child: const Text(
              "Agendar",
              style: TextStyle(color: Colors.white),
            ),
          ),

          const SizedBox(height: 10),
        ],
      ),
    );
  }
}
